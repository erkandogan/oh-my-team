/**
 * Smoke tests for media download utilities.
 *
 * Uses Bun's built-in test runner (`bun test`). No extra dependencies.
 * Runs against a tiny in-process HTTP server so we exercise the real
 * fetch + stream + cleanup code paths.
 */

import { describe, expect, test, beforeAll, afterAll } from "bun:test"
import { mkdtempSync, rmSync, existsSync, readFileSync, statSync } from "node:fs"
import { tmpdir } from "node:os"
import path from "node:path"

import {
  AttachmentDownloadError,
  AttachmentTooLarge,
  attachmentDir,
  classifyMime,
  downloadToFile,
  ensureAttachmentDir,
  guessMimeFromName,
  redactUrl,
  removeAttachmentDir,
  sanitizeFilename,
  sanitizeSegment,
  saveAttachment,
  sweepOldAttachments,
  uniqueFilename,
} from "./media"

// ── Redirect OMT_HUB_DIR to a fresh tmp dir per test run ─────────────────
const tmpBase = mkdtempSync(path.join(tmpdir(), "omt-media-test-"))
process.env.OMT_HUB_DIR = tmpBase

// ── Fixture HTTP server ─────────────────────────────────────────────────
let server: ReturnType<typeof Bun.serve>
let serverUrl: string

beforeAll(() => {
  server = Bun.serve({
    port: 0, // any free port
    hostname: "127.0.0.1",
    fetch(req) {
      const url = new URL(req.url)

      // /file/:size — returns N bytes of 'a', no Content-Length on /nolen
      if (url.pathname.startsWith("/file/")) {
        const size = Number(url.pathname.split("/")[2]) || 0
        const buf = Buffer.alloc(size, "a")
        return new Response(buf, {
          headers: { "Content-Type": "application/octet-stream" },
        })
      }

      // /stream/:size — sends the same bytes without Content-Length header
      if (url.pathname.startsWith("/stream/")) {
        const size = Number(url.pathname.split("/")[2]) || 0
        const stream = new ReadableStream({
          start(controller) {
            controller.enqueue(new Uint8Array(size).fill(97))
            controller.close()
          },
        })
        return new Response(stream, {
          headers: { "Content-Type": "application/octet-stream" },
          // no content-length, forces the streaming byte counter to fire
        })
      }

      if (url.pathname === "/404") {
        return new Response("not found", { status: 404 })
      }

      // /auth/:size — returns the requested bytes ONLY when the caller sent
      // `Authorization: Bearer expected-token`. Anything else → 401. Used to
      // verify adapters pass the bot token through to downloadToFile.
      if (url.pathname.startsWith("/auth/")) {
        const auth = req.headers.get("authorization")
        if (auth !== "Bearer expected-token") {
          return new Response("unauthorized", { status: 401 })
        }
        const size = Number(url.pathname.split("/")[2]) || 0
        return new Response(Buffer.alloc(size, "a"), {
          headers: { "Content-Type": "application/octet-stream" },
        })
      }

      // /tg/bot<TOKEN>/file.bin — mimics Telegram's file URL so we can assert
      // the error message redacts the token segment rather than leaking it.
      if (url.pathname.startsWith("/tg/bot")) {
        return new Response("forbidden", { status: 403 })
      }

      return new Response("ok", { status: 200 })
    },
  })
  serverUrl = `http://127.0.0.1:${server.port}`
})

afterAll(() => {
  server.stop(true)
  rmSync(tmpBase, { recursive: true, force: true })
})

// ── sanitizeFilename ────────────────────────────────────────────────────

describe("sanitizeFilename", () => {
  test("strips path traversal", () => {
    expect(sanitizeFilename("../../etc/passwd")).toBe("passwd")
    expect(sanitizeFilename("/absolute/path.png")).toBe("path.png")
  })

  test("replaces unsafe chars with underscore", () => {
    expect(sanitizeFilename("my photo.jpg")).toBe("my_photo.jpg")
    expect(sanitizeFilename("weird!@#$name.txt")).toBe("weird_name.txt")
  })

  test("strips leading dots", () => {
    expect(sanitizeFilename(".hidden")).toBe("hidden")
    expect(sanitizeFilename("...ghost")).toBe("ghost")
  })

  test("empty → file fallback", () => {
    expect(sanitizeFilename("")).toBe("file")
    expect(sanitizeFilename(null)).toBe("file")
    expect(sanitizeFilename(undefined)).toBe("file")
  })

  test("caps length", () => {
    const long = "a".repeat(500)
    expect(sanitizeFilename(long).length).toBeLessThanOrEqual(100)
  })
})

// ── sanitizeSegment ─────────────────────────────────────────────────────

describe("sanitizeSegment", () => {
  test("replaces slashes with underscore", () => {
    expect(sanitizeSegment("foo/bar")).toBe("foo_bar")
    // dots are preserved (needed for extensions and Slack ts), but slash isn't
    expect(sanitizeSegment("../evil")).toBe(".._evil")
  })

  test("preserves Slack-style ts strings", () => {
    // Slack thread IDs look like "1710000000.000100" — numbers + dot.
    expect(sanitizeSegment("1710000000.000100")).toBe("1710000000.000100")
  })

  test("resulting dir still lives inside the attachments root", async () => {
    // Even pathological inputs must not escape the root — path.join handles
    // literal ".." segments, but since slashes are stripped they can't form
    // separate path components.
    const dir = await ensureAttachmentDir("../../../../etc")
    expect(dir.startsWith(tmpBase)).toBe(true)
  })
})

// ── MIME helpers ────────────────────────────────────────────────────────

describe("guessMimeFromName / classifyMime", () => {
  test("known extensions", () => {
    expect(guessMimeFromName("photo.jpg")).toBe("image/jpeg")
    expect(guessMimeFromName("doc.pdf")).toBe("application/pdf")
    expect(guessMimeFromName("voice.ogg")).toBe("audio/ogg")
  })

  test("unknown extensions → octet-stream", () => {
    expect(guessMimeFromName("weird.xyz")).toBe("application/octet-stream")
  })

  test("classifyMime buckets", () => {
    expect(classifyMime("image/png")).toBe("image")
    expect(classifyMime("video/mp4")).toBe("video")
    expect(classifyMime("audio/ogg")).toBe("audio")
    expect(classifyMime("application/pdf")).toBe("document")
    expect(classifyMime("text/plain")).toBe("document")
    expect(classifyMime("")).toBe("other")
  })
})

// ── uniqueFilename ──────────────────────────────────────────────────────

describe("uniqueFilename", () => {
  test("prefixes with timestamp + random and keeps extension", () => {
    const name = uniqueFilename("cat.jpg")
    expect(name.endsWith("_cat.jpg")).toBe(true)
    // Format: <ms timestamp>_<6 base36 chars>_<safeName>
    expect(name).toMatch(/^\d+_[a-z0-9]{6}_cat\.jpg$/)
  })

  test("same name called rapidly yields distinct filenames (collision-resistant)", () => {
    // Simulate the worst case: same original name, called thousands of times
    // within the same tight loop — many will land in the same millisecond.
    const names = new Set<string>()
    for (let i = 0; i < 1000; i++) {
      names.add(uniqueFilename("Screenshot.png"))
    }
    // Without the random suffix this would collapse to ~1 entry; with it
    // we expect ~1000 distinct names (tiny birthday-paradox risk, but far
    // from the near-certain collisions the old impl produced).
    expect(names.size).toBeGreaterThan(990)
  })
})

// ── Directory helpers ───────────────────────────────────────────────────

describe("ensureAttachmentDir / attachmentDir", () => {
  test("creates nested dir under attachments root", async () => {
    const threadId = "thread-xyz"
    const dir = await ensureAttachmentDir(threadId)
    expect(dir).toBe(attachmentDir(threadId))
    expect(dir.startsWith(tmpBase)).toBe(true)
    expect(existsSync(dir)).toBe(true)
  })

  test("removeAttachmentDir wipes the dir", async () => {
    const threadId = "thread-to-remove"
    const dir = await ensureAttachmentDir(threadId)
    expect(existsSync(dir)).toBe(true)
    await removeAttachmentDir(threadId)
    expect(existsSync(dir)).toBe(false)
  })

  test("thread IDs with slashes are sanitized", async () => {
    // If a bad actor passed "../evil", the resolved dir must still live
    // inside the attachments root.
    const dir = await ensureAttachmentDir("../evil")
    expect(dir.startsWith(tmpBase)).toBe(true)
  })
})

// ── downloadToFile: happy path ──────────────────────────────────────────

describe("downloadToFile", () => {
  test("downloads a small file with Content-Length", async () => {
    const dir = await ensureAttachmentDir("dl-test-1")
    const dest = path.join(dir, "small.bin")
    const { size } = await downloadToFile(`${serverUrl}/file/1024`, dest)
    expect(size).toBe(1024)
    expect(existsSync(dest)).toBe(true)
    expect(statSync(dest).size).toBe(1024)
    expect(readFileSync(dest).every((b) => b === 97)).toBe(true)
  })

  test("downloads a chunked file without Content-Length", async () => {
    const dir = await ensureAttachmentDir("dl-test-2")
    const dest = path.join(dir, "stream.bin")
    const { size } = await downloadToFile(`${serverUrl}/stream/2048`, dest)
    expect(size).toBe(2048)
    expect(statSync(dest).size).toBe(2048)
  })

  test("rejects when Content-Length exceeds cap", async () => {
    const dir = await ensureAttachmentDir("dl-test-3")
    const dest = path.join(dir, "too-big.bin")
    await expect(
      downloadToFile(`${serverUrl}/file/2000`, dest, { maxSize: 1000 })
    ).rejects.toThrow(AttachmentTooLarge)
    // Partial file must have been cleaned up — since we reject before opening,
    // the file should never have been created at all.
    expect(existsSync(dest)).toBe(false)
  })

  test("rejects when streamed bytes exceed cap (no Content-Length)", async () => {
    const dir = await ensureAttachmentDir("dl-test-4")
    const dest = path.join(dir, "overflow.bin")
    await expect(
      downloadToFile(`${serverUrl}/stream/5000`, dest, { maxSize: 1000 })
    ).rejects.toThrow(AttachmentTooLarge)
    // Partial file cleaned up
    expect(existsSync(dest)).toBe(false)
  })

  test("throws AttachmentDownloadError on non-2xx", async () => {
    const dir = await ensureAttachmentDir("dl-test-5")
    const dest = path.join(dir, "missing.bin")
    await expect(
      downloadToFile(`${serverUrl}/404`, dest)
    ).rejects.toThrow(AttachmentDownloadError)
    expect(existsSync(dest)).toBe(false)
  })
})

// ── sweepOldAttachments ────────────────────────────────────────────────

describe("sweepOldAttachments", () => {
  test("does not throw when root is missing", async () => {
    await sweepOldAttachments("never-existed")
    // passes if no exception
  })

  test("keeps fresh files, cleans ancient ones", async () => {
    const dir = await ensureAttachmentDir("sweep-test")
    const fresh = path.join(dir, "fresh.bin")
    const old = path.join(dir, "old.bin")
    await Bun.write(fresh, "fresh")
    await Bun.write(old, "old")

    // Age the old file by backdating its mtime.
    const { utimesSync } = await import("node:fs")
    const ancient = new Date(Date.now() - 48 * 60 * 60 * 1000) // 48h ago
    utimesSync(old, ancient, ancient)

    await sweepOldAttachments("sweep-test")

    expect(existsSync(fresh)).toBe(true)
    expect(existsSync(old)).toBe(false)
  })
})

// ── saveAttachment (high-level helper) ──────────────────────────────────

describe("saveAttachment", () => {
  test("returns a populated Attachment on success", async () => {
    const att = await saveAttachment(`${serverUrl}/file/512`, "sa-test-1", {
      fallbackName: "report.pdf",
      mimeType: "application/pdf",
      source: "test",
      id: "file-123",
    })
    expect(att).not.toBeNull()
    expect(att!.name).toBe("report.pdf")
    expect(att!.mimeType).toBe("application/pdf")
    expect(att!.size).toBe(512)
    expect(att!.kind).toBe("document")
    expect(existsSync(att!.path)).toBe(true)
  })

  test("returns null (not throws) on download failure", async () => {
    const att = await saveAttachment(`${serverUrl}/404`, "sa-test-2", {
      fallbackName: "missing.txt",
      source: "test",
    })
    expect(att).toBeNull()
  })

  test("rejects before hitting the network when declaredSize exceeds cap", async () => {
    const att = await saveAttachment(`${serverUrl}/file/999999`, "sa-test-3", {
      fallbackName: "huge.bin",
      declaredSize: 100 * 1024 * 1024, // 100MB > 20MB cap
      source: "test",
    })
    expect(att).toBeNull()
  })

  test("concurrent downloads to the same thread get unique filenames", async () => {
    // Fire several downloads in parallel. Because uniqueFilename() stamps
    // each name with Date.now(), there IS a narrow window where two calls
    // could collide. The timestamp is ms resolution and downloads take
    // longer than that to start writing, so in practice filenames diverge
    // because the name prefix also varies — but we assert the invariant
    // explicitly so a future change can't regress it.
    const results = await Promise.all([
      saveAttachment(`${serverUrl}/file/100`, "concurrent", { fallbackName: "a.bin", source: "test" }),
      saveAttachment(`${serverUrl}/file/200`, "concurrent", { fallbackName: "b.bin", source: "test" }),
      saveAttachment(`${serverUrl}/file/300`, "concurrent", { fallbackName: "c.bin", source: "test" }),
      saveAttachment(`${serverUrl}/file/400`, "concurrent", { fallbackName: "d.bin", source: "test" }),
      saveAttachment(`${serverUrl}/file/500`, "concurrent", { fallbackName: "e.bin", source: "test" }),
    ])

    // All succeeded
    expect(results.every((r) => r !== null)).toBe(true)

    // All paths are distinct — no silent overwrites
    const paths = new Set(results.map((r) => r!.path))
    expect(paths.size).toBe(5)

    // Each file has the expected payload size
    expect(results[0]!.size).toBe(100)
    expect(results[4]!.size).toBe(500)

    // All files exist on disk
    for (const r of results) expect(existsSync(r!.path)).toBe(true)
  })

  test("forwards headers to fetch — Slack Bearer token pattern", async () => {
    // Without headers → 401 → returns null
    const without = await saveAttachment(`${serverUrl}/auth/256`, "hdr-test-1", {
      fallbackName: "needs-auth.bin",
      source: "test",
    })
    expect(without).toBeNull()

    // With matching Authorization header → 200 → success
    const withAuth = await saveAttachment(`${serverUrl}/auth/256`, "hdr-test-2", {
      fallbackName: "needs-auth.bin",
      headers: { Authorization: "Bearer expected-token" },
      source: "test",
    })
    expect(withAuth).not.toBeNull()
    expect(withAuth!.size).toBe(256)
  })
})

// ── URL redaction (prevents bot token leakage) ──────────────────────────

describe("redactUrl / AttachmentDownloadError", () => {
  test("redactUrl masks the token segment in Telegram-style URLs", () => {
    const raw = "https://api.telegram.org/file/bot123456:AAAAAA-secret/photos/file_1.jpg"
    const safe = redactUrl(raw)
    expect(safe).toBe(
      "https://api.telegram.org/file/bot<REDACTED>/photos/file_1.jpg"
    )
    expect(safe).not.toContain("AAAAAA-secret")
    expect(safe).not.toContain("123456")
  })

  test("redactUrl leaves normal URLs untouched", () => {
    const raw = "https://files.slack.com/files-pri/T123/F456/screenshot.png"
    expect(redactUrl(raw)).toBe(raw)
  })

  test("AttachmentDownloadError stores and displays only the redacted URL", async () => {
    try {
      await downloadToFile(
        `${serverUrl}/tg/bot999:TOP-SECRET/file.bin`,
        path.join(tmpBase, "never-written.bin")
      )
      expect("should not reach here").toBe("but we did")
    } catch (err) {
      expect(err).toBeInstanceOf(AttachmentDownloadError)
      const e = err as AttachmentDownloadError
      // The token must NOT appear in any string exposed by the error.
      expect(e.message).not.toContain("TOP-SECRET")
      expect(e.message).not.toContain("999:TOP-SECRET")
      expect(e.url).not.toContain("TOP-SECRET")
      // And the placeholder should be present so operators can still see the host/path shape.
      expect(e.message).toContain("bot<REDACTED>")
    }
  })
})
