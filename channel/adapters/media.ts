/**
 * Oh My Team — Media Download Utilities
 *
 * Shared helpers used by platform adapters (Telegram, Slack, …) to download
 * user-shared media to local disk in a safe, predictable layout.
 *
 * Layout:
 *   ~/.oh-my-team/attachments/<threadId>/<timestamp>_<safeName>
 *
 * Scoping by threadId lets us associate files with the session they belong
 * to (each project session has its own threadId), so cleanup on session
 * removal and per-session routing stay simple.
 *
 * Safety guarantees:
 *   - Filenames are sanitized — no path traversal, no hidden files.
 *   - Size is enforced BEFORE writing when Content-Length is available,
 *     and the partial file is removed if the stream exceeds the cap.
 *   - Destination paths always stay inside the attachments root.
 */

import type { AttachmentKind } from "./types"
import { mkdir, readdir, rm, stat } from "node:fs/promises"
import { createWriteStream, type WriteStream } from "node:fs"
import path from "node:path"
import { Readable } from "node:stream"
import { pipeline } from "node:stream/promises"

// ── Constants ──────────────────────────────────────────────────────────────

/** Telegram Bot API caps getFile at 20 MB. Slack file limits vary but 20 MB
 *  is a sensible default — users with larger files should share differently. */
export const MAX_ATTACHMENT_SIZE = 20 * 1024 * 1024

/** Files older than this are swept on each download to avoid unbounded growth. */
export const ATTACHMENT_MAX_AGE_MS = 24 * 60 * 60 * 1000 // 24h

// ── Root directory ─────────────────────────────────────────────────────────

/** Resolves to the attachments root. Honours OMT_HUB_DIR like the router does. */
export function attachmentsRoot(): string {
  const base = process.env.OMT_HUB_DIR || path.join(process.env.HOME || ".", ".oh-my-team")
  return path.join(base, "attachments")
}

/** Per-thread subdirectory. The threadId is sanitized — it can come from
 *  user input (e.g. Slack ts like "1710000000.000100") and we don't want
 *  surprises in the path. */
export function attachmentDir(threadId: string): string {
  return path.join(attachmentsRoot(), sanitizeSegment(threadId))
}

// ── Filename hygiene ──────────────────────────────────────────────────────

const UNSAFE_CHARS = /[^a-zA-Z0-9._-]+/g
const MAX_NAME_LEN = 100

/** Strip path separators and control chars; keep a short tail. Empty → "file". */
export function sanitizeFilename(name: string | undefined | null): string {
  if (!name) return "file"
  // Take only the basename to defeat "../foo" or "/etc/passwd"
  const basename = path.basename(String(name))
  const cleaned = basename.replace(UNSAFE_CHARS, "_").replace(/^\.+/, "").slice(0, MAX_NAME_LEN)
  return cleaned || "file"
}

/** Sanitize a single path segment (threadId, sessionName, etc.). */
export function sanitizeSegment(seg: string): string {
  return String(seg).replace(UNSAFE_CHARS, "_").slice(0, MAX_NAME_LEN) || "unknown"
}

/** Build a unique filename like "1710000000123_photo.jpg" scoped to a dir. */
export function uniqueFilename(originalName: string | undefined | null): string {
  const safe = sanitizeFilename(originalName)
  return `${Date.now()}_${safe}`
}

// ── MIME classification ────────────────────────────────────────────────────

const EXT_MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".heic": "image/heic",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".txt": "text/plain",
  ".md": "text/markdown",
  ".json": "application/json",
  ".csv": "text/csv",
  ".log": "text/plain",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".ogg": "audio/ogg",
  ".m4a": "audio/mp4",
  ".mp4": "video/mp4",
  ".mov": "video/quicktime",
  ".webm": "video/webm",
}

/** Guess a MIME type from a filename. Falls back to application/octet-stream. */
export function guessMimeFromName(name: string): string {
  const ext = path.extname(name).toLowerCase()
  return EXT_MIME[ext] || "application/octet-stream"
}

/** Classify a MIME type into one of our AttachmentKind buckets. */
export function classifyMime(mimeType: string | undefined): AttachmentKind {
  const mt = (mimeType || "").toLowerCase()
  if (mt.startsWith("image/")) return "image"
  if (mt.startsWith("video/")) return "video"
  if (mt.startsWith("audio/")) return "audio"
  // Documents: text/*, application/pdf, application/msword, etc.
  if (mt.startsWith("text/") || mt === "application/pdf" || mt.startsWith("application/")) {
    return "document"
  }
  return "other"
}

// ── Directory management ───────────────────────────────────────────────────

/** Create the per-thread directory if missing. Safe to call repeatedly. */
export async function ensureAttachmentDir(threadId: string): Promise<string> {
  const dir = attachmentDir(threadId)
  await mkdir(dir, { recursive: true })
  return dir
}

/** Best-effort cleanup: delete files older than ATTACHMENT_MAX_AGE_MS under
 *  the given threadId (or all threads if undefined). Never throws — sweeping
 *  is opportunistic. */
export async function sweepOldAttachments(threadId?: string): Promise<void> {
  try {
    const root = threadId ? attachmentDir(threadId) : attachmentsRoot()
    const entries = await readdir(root, { withFileTypes: true }).catch(() => [])
    const cutoff = Date.now() - ATTACHMENT_MAX_AGE_MS

    for (const entry of entries) {
      const entryPath = path.join(root, entry.name)
      try {
        if (entry.isDirectory()) {
          // Recurse into thread dirs when sweeping the root
          if (!threadId) await sweepOldAttachments(entry.name)
        } else {
          const info = await stat(entryPath)
          if (info.mtimeMs < cutoff) {
            await rm(entryPath, { force: true })
          }
        }
      } catch {
        // Ignore individual failures — cleanup is best-effort
      }
    }
  } catch {
    // Root doesn't exist yet or is unreadable — nothing to do
  }
}

/** Delete an entire thread's attachment directory. Called on session removal. */
export async function removeAttachmentDir(threadId: string): Promise<void> {
  try {
    await rm(attachmentDir(threadId), { recursive: true, force: true })
  } catch {
    // best-effort
  }
}

// ── Downloading ───────────────────────────────────────────────────────────

export interface DownloadOptions {
  /** Extra headers (e.g. { Authorization: "Bearer ..." } for Slack). */
  headers?: Record<string, string>
  /** Override the max size. Default: MAX_ATTACHMENT_SIZE. */
  maxSize?: number
}

export class AttachmentTooLarge extends Error {
  constructor(public size: number, public limit: number) {
    super(`attachment too large: ${size} bytes (limit ${limit})`)
    this.name = "AttachmentTooLarge"
  }
}

export class AttachmentDownloadError extends Error {
  constructor(public status: number, public statusText: string, public url: string) {
    super(`download failed: HTTP ${status} ${statusText}`)
    this.name = "AttachmentDownloadError"
  }
}

/**
 * Download `url` to `destPath`, streaming without buffering the whole file
 * in memory. Enforces the size cap via Content-Length and then again during
 * streaming. On any failure the partial file is removed.
 */
export async function downloadToFile(
  url: string,
  destPath: string,
  options: DownloadOptions = {}
): Promise<{ size: number }> {
  const maxSize = options.maxSize ?? MAX_ATTACHMENT_SIZE

  const response = await fetch(url, { headers: options.headers })
  if (!response.ok) {
    throw new AttachmentDownloadError(response.status, response.statusText, url)
  }

  // Pre-check Content-Length when provided — cheapest rejection path
  const contentLength = Number(response.headers.get("content-length") || 0)
  if (contentLength && contentLength > maxSize) {
    throw new AttachmentTooLarge(contentLength, maxSize)
  }
  if (!response.body) {
    throw new Error("response has no body")
  }

  // Stream with a running byte counter so we also catch chunked responses
  // that omit Content-Length.
  let written = 0
  let stream: WriteStream | null = null
  try {
    stream = createWriteStream(destPath)
    const nodeStream = Readable.fromWeb(response.body as unknown as import("node:stream/web").ReadableStream)

    await pipeline(
      async function* () {
        for await (const chunk of nodeStream) {
          const buf = chunk as Buffer
          written += buf.byteLength
          if (written > maxSize) {
            throw new AttachmentTooLarge(written, maxSize)
          }
          yield buf
        }
      },
      stream
    )
    return { size: written }
  } catch (err) {
    // Clean up partial file on any failure
    await rm(destPath, { force: true }).catch(() => {})
    throw err
  }
}
