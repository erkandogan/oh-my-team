/**
 * Oh My Team — Telegram Adapter
 *
 * Implements ChannelAdapter for Telegram using Forum Topics.
 * Uses raw Telegram Bot API via fetch — no external dependencies.
 *
 * Group setup:
 *   1. Create a group, add the bot, make it admin
 *   2. Enable Topics (Forum mode) in group settings
 *   3. Bot creates/closes topics for each project session
 *   4. General topic → hub session
 *   5. Named topics → project sessions (via bridges)
 */

import type {
  ChannelAdapter,
  AdapterConfig,
  Attachment,
  AttachmentKind,
  InboundMessage,
  ThreadInfo,
  PermissionPrompt,
} from "./types";
import { saveAttachment } from "./media";

// ── Telegram Bot API types (minimal, only what we use) ─────────────────────

interface TgUpdate {
  update_id: number;
  message?: TgMessage;
}

interface TgMessage {
  message_id: number;
  message_thread_id?: number;
  from?: {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
  };
  chat: {
    id: number;
    type: string;
  };
  text?: string;
  /** Caption accompanying photo/video/document. Treat as the "text" of a media message. */
  caption?: string;
  date: number;
  /** Photos arrive as an array of sizes — pick the largest. */
  photo?: TgPhotoSize[];
  /** Generic file uploads. */
  document?: TgDocument;
  /** Telegram voice messages (.ogg Opus). Transcription lives behind a separate issue. */
  voice?: TgVoice;
  /** Round video "circles" — treated like videos. */
  video?: TgVideo;
  /** Standalone audio files. */
  audio?: TgAudio;
}

interface TgPhotoSize {
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
  file_size?: number;
}

interface TgDocument {
  file_id: string;
  file_unique_id: string;
  file_name?: string;
  mime_type?: string;
  file_size?: number;
}

interface TgVoice {
  file_id: string;
  file_unique_id: string;
  duration: number;
  mime_type?: string;
  file_size?: number;
}

interface TgVideo {
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
  duration: number;
  file_name?: string;
  mime_type?: string;
  file_size?: number;
}

interface TgAudio {
  file_id: string;
  file_unique_id: string;
  duration: number;
  performer?: string;
  title?: string;
  file_name?: string;
  mime_type?: string;
  file_size?: number;
}

interface TgForumTopic {
  message_thread_id: number;
  name: string;
}

// ── Permission response detection ──────────────────────────────────────────

const PERMISSION_RE = /^\s*(y|yes|n|no)\s+([a-km-z]{5})\s*$/i;

// ── Adapter implementation ─────────────────────────────────────────────────

export class TelegramAdapter implements ChannelAdapter {
  readonly name = "telegram";

  private token = "";
  private chatId = "";
  private apiBase = "";
  private offset = 0;
  private polling = false;
  private pollTimer: ReturnType<typeof setTimeout> | null = null;

  private messageCallback:
    | ((message: InboundMessage) => void)
    | null = null;
  private permissionCallback:
    | ((requestId: string, allow: boolean) => void)
    | null = null;

  // ── Lifecycle ──────────────────────────────────────────────────────

  async connect(config: AdapterConfig): Promise<void> {
    this.token = config.credentials.botToken;
    this.chatId = config.credentials.chatId;

    if (!this.token || !this.chatId) {
      throw new Error(
        "Telegram adapter requires credentials.botToken and credentials.chatId"
      );
    }

    this.apiBase = `https://api.telegram.org/bot${this.token}`;

    // Verify the bot token and group access
    const me = await this.api("getMe");
    if (!me.ok) {
      throw new Error(`Invalid bot token: ${JSON.stringify(me)}`);
    }

    const chat = await this.api("getChat", { chat_id: this.chatId });
    if (!chat.ok) {
      throw new Error(
        `Cannot access chat ${this.chatId}: ${JSON.stringify(chat)}`
      );
    }

    process.stderr.write(
      `omt-telegram: Connected as @${me.result.username} in "${chat.result.title}"\n`
    );

    // Start polling
    this.polling = true;
    this.poll();
  }

  async disconnect(): Promise<void> {
    this.polling = false;
    if (this.pollTimer) {
      clearTimeout(this.pollTimer);
      this.pollTimer = null;
    }
  }

  // ── Thread management ──────────────────────────────────────────────

  async createThread(sessionName: string): Promise<ThreadInfo> {
    const result = await this.api("createForumTopic", {
      chat_id: this.chatId,
      name: sessionName,
      icon_color: 7322096, // Blue-ish
    });

    if (!result.ok) {
      throw new Error(
        `Failed to create topic "${sessionName}": ${JSON.stringify(result)}`
      );
    }

    const topic = result.result as TgForumTopic;

    // Send a welcome message in the new topic
    await this.api("sendMessage", {
      chat_id: this.chatId,
      message_thread_id: topic.message_thread_id,
      text: `Session "${sessionName}" is ready. Messages here go directly to the Claude session working on this project.`,
    });

    return {
      threadId: String(topic.message_thread_id),
      displayName: sessionName,
    };
  }

  async closeThread(threadId: string): Promise<void> {
    // Send a closing message
    await this.api("sendMessage", {
      chat_id: this.chatId,
      message_thread_id: Number(threadId),
      text: "Session closed.",
    }).catch(() => {});

    // Close the topic (doesn't delete it, just archives)
    await this.api("closeForumTopic", {
      chat_id: this.chatId,
      message_thread_id: Number(threadId),
    }).catch(() => {
      // Topic might already be closed — that's fine
    });
  }

  async reopenThread(threadId: string, sessionName: string): Promise<void> {
    if (threadId === "__general__") return;

    // Reopen the closed forum topic
    await this.api("reopenForumTopic", {
      chat_id: this.chatId,
      message_thread_id: Number(threadId),
    }).catch(() => {
      // Topic might already be open — that's fine
    });

    // Send a resume notification in the topic
    await this.api("sendMessage", {
      chat_id: this.chatId,
      message_thread_id: Number(threadId),
      text: `Session "${sessionName}" resumed.`,
    }).catch(() => {});
  }

  // ── Sending ────────────────────────────────────────────────────────

  async send(threadId: string, text: string): Promise<void> {
    // Telegram has a 4096 char limit per message — chunk if needed
    const chunks = this.chunkText(text, 4000);

    for (const chunk of chunks) {
      const result = await this.api("sendMessage", {
        chat_id: this.chatId,
        message_thread_id: Number(threadId),
        text: chunk,
        parse_mode: "Markdown",
      });

      // If Markdown parsing fails, retry without it
      if (!result.ok && result.description?.includes("parse")) {
        await this.api("sendMessage", {
          chat_id: this.chatId,
          message_thread_id: Number(threadId),
          text: chunk,
        });
      }
    }
  }

  async sendPermissionPrompt(
    threadId: string,
    prompt: PermissionPrompt
  ): Promise<void> {
    const text = [
      `**Permission Request**`,
      `Tool: \`${prompt.toolName}\``,
      `Action: ${prompt.description}`,
      ``,
      `Reply \`yes ${prompt.requestId}\` or \`no ${prompt.requestId}\``,
    ].join("\n");

    await this.api("sendMessage", {
      chat_id: this.chatId,
      message_thread_id: Number(threadId),
      text,
    });
  }

  // ── Event registration ─────────────────────────────────────────────

  onMessage(callback: (message: InboundMessage) => void): void {
    this.messageCallback = callback;
  }

  onPermissionResponse(
    callback: (requestId: string, allow: boolean) => void
  ): void {
    this.permissionCallback = callback;
  }

  getHubThreadId(): string | null {
    // Telegram General topic has no thread_id (messages without thread_id
    // belong to General). We return null to indicate "no thread_id filter".
    return null;
  }

  // ── Status indicators ─────────────────────────────────────────────

  async sendTypingIndicator(threadId: string): Promise<void> {
    const params: Record<string, unknown> = {
      chat_id: this.chatId,
      action: "typing",
    };
    if (threadId !== "__general__") {
      params.message_thread_id = Number(threadId);
    }
    await this.api("sendChatAction", params).catch(() => {});
  }

  async sendStatusMessage(threadId: string, text: string): Promise<string> {
    const params: Record<string, unknown> = {
      chat_id: this.chatId,
      text,
      parse_mode: "Markdown",
    };
    if (threadId !== "__general__") {
      params.message_thread_id = Number(threadId);
    }
    let result = await this.api("sendMessage", params);
    // Retry without Markdown if parse failed
    if (!result.ok && result.description?.includes("parse")) {
      delete params.parse_mode;
      result = await this.api("sendMessage", params);
    }
    return String(result.result?.message_id || "");
  }

  async updateStatusMessage(_threadId: string, messageId: string, text: string): Promise<void> {
    const result = await this.api("editMessageText", {
      chat_id: this.chatId,
      message_id: Number(messageId),
      text,
      parse_mode: "Markdown",
    });
    // Retry without Markdown if parse failed (status text often has backticks/underscores)
    if (!result.ok) {
      await this.api("editMessageText", {
        chat_id: this.chatId,
        message_id: Number(messageId),
        text,
      }).catch(() => {});
    }
  }

  async deleteStatusMessage(_threadId: string, messageId: string): Promise<void> {
    await this.api("deleteMessage", {
      chat_id: this.chatId,
      message_id: Number(messageId),
    }).catch(() => {});
  }

  // ── Polling loop ───────────────────────────────────────────────────

  private async poll(): Promise<void> {
    if (!this.polling) return;

    try {
      const result = await this.api("getUpdates", {
        offset: this.offset,
        timeout: 30,
        allowed_updates: JSON.stringify(["message"]),
      });

      if (result.ok && Array.isArray(result.result)) {
        for (const update of result.result as TgUpdate[]) {
          this.offset = update.update_id + 1;
          this.handleUpdate(update);
        }
      }
    } catch (err) {
      // Network error — wait before retrying
      process.stderr.write(
        `omt-telegram: Poll error: ${err instanceof Error ? err.message : err}\n`
      );
      await this.sleep(5000);
    }

    // Schedule next poll — getUpdates with timeout=30 already blocks for 30s
    // when there are no updates (Telegram long-polling), so no delay needed here
    if (this.polling) {
      this.pollTimer = setTimeout(() => this.poll(), 0);
    }
  }

  private async handleUpdate(update: TgUpdate): Promise<void> {
    const msg = update.message;
    if (!msg || !msg.from) return;

    // Only handle messages from our configured group
    if (String(msg.chat.id) !== this.chatId) return;

    // Message text — may be empty for media-only messages. Prefer the
    // explicit text field; fall back to the caption attached to media.
    const text = (msg.text || msg.caption || "").trim();
    const threadId = msg.message_thread_id
      ? String(msg.message_thread_id)
      : "__general__";

    // Check if this is a permission response
    const permMatch = PERMISSION_RE.exec(text);
    if (permMatch && this.permissionCallback) {
      const allow = permMatch[1].toLowerCase().startsWith("y");
      const requestId = permMatch[2].toLowerCase();
      this.permissionCallback(requestId, allow);
      return;
    }

    // Download any media attachments. Errors are logged but don't block the
    // message — we still want the caption/text through even if a file fails.
    const attachments = await this.downloadAttachments(msg, threadId);

    // Nothing to forward? (empty text AND no attachments)
    if (!text && attachments.length === 0) return;

    if (this.messageCallback) {
      this.messageCallback({
        threadId,
        text,
        senderId: String(msg.from.id),
        senderName: [msg.from.first_name, msg.from.last_name]
          .filter(Boolean)
          .join(" "),
        messageId: String(msg.message_id),
        timestamp: new Date(msg.date * 1000).toISOString(),
        attachments: attachments.length > 0 ? attachments : undefined,
      });
    }
  }

  // ── Attachment downloading ─────────────────────────────────────────

  /** Walk a message's media fields and download each. Never throws —
   *  individual failures are logged and the rest proceed. */
  private async downloadAttachments(
    msg: TgMessage,
    threadId: string
  ): Promise<Attachment[]> {
    const jobs: Promise<Attachment | null>[] = [];

    // Photos: Telegram sends multiple resolutions; pick the largest (last entry).
    if (msg.photo && msg.photo.length > 0) {
      const best = msg.photo[msg.photo.length - 1];
      jobs.push(
        this.downloadFile(best.file_id, threadId, {
          fallbackName: `photo_${best.file_unique_id}.jpg`,
          mimeType: "image/jpeg",
          declaredSize: best.file_size,
          kind: "image",
        })
      );
    }

    // Documents, audio, video, voice: each uses the same download path.
    if (msg.document) {
      jobs.push(
        this.downloadFile(msg.document.file_id, threadId, {
          fallbackName: msg.document.file_name || `document_${msg.document.file_unique_id}`,
          mimeType: msg.document.mime_type,
          declaredSize: msg.document.file_size,
        })
      );
    }
    if (msg.audio) {
      jobs.push(
        this.downloadFile(msg.audio.file_id, threadId, {
          fallbackName: msg.audio.file_name || `audio_${msg.audio.file_unique_id}.mp3`,
          mimeType: msg.audio.mime_type,
          declaredSize: msg.audio.file_size,
          kind: "audio",
        })
      );
    }
    if (msg.video) {
      jobs.push(
        this.downloadFile(msg.video.file_id, threadId, {
          fallbackName: msg.video.file_name || `video_${msg.video.file_unique_id}.mp4`,
          mimeType: msg.video.mime_type,
          declaredSize: msg.video.file_size,
          kind: "video",
        })
      );
    }
    if (msg.voice) {
      // Voice messages: saved as attachments today. Transcription/voice-bridge
      // support lives behind a separate issue — the session just gets the .ogg
      // for now and can Read/describe it if it wants.
      jobs.push(
        this.downloadFile(msg.voice.file_id, threadId, {
          fallbackName: `voice_${msg.voice.file_unique_id}.ogg`,
          mimeType: msg.voice.mime_type || "audio/ogg",
          declaredSize: msg.voice.file_size,
          kind: "voice",
        })
      );
    }

    const results = await Promise.all(jobs);
    return results.filter((x): x is Attachment => x !== null);
  }

  /**
   * Download a single Telegram file by `file_id` via the Bot API.
   * Two-step: (1) getFile → file_path, (2) GET /file/bot<token>/<file_path>.
   *
   * Returns null on any failure (size limit, network, API error). The message
   * still flows — we just drop the file and log why.
   */
  private async downloadFile(
    fileId: string,
    threadId: string,
    opts: {
      fallbackName: string;
      mimeType?: string;
      declaredSize?: number;
      kind?: AttachmentKind;
    }
  ): Promise<Attachment | null> {
    // Resolve file_id → file_path via Bot API. The actual download is shared
    // with Slack (see saveAttachment in media.ts).
    const info = await this.api("getFile", { file_id: fileId });
    if (!info.ok || !info.result?.file_path) {
      process.stderr.write(
        `omt-telegram: ${fileId}: getFile failed: ${info.description || "unknown error"}\n`
      );
      return null;
    }
    const serverPath = String(info.result.file_path);
    const url = `https://api.telegram.org/file/bot${this.token}/${serverPath}`;

    return saveAttachment(url, threadId, {
      fallbackName: opts.fallbackName,
      mimeType: opts.mimeType,
      declaredSize: opts.declaredSize,
      kind: opts.kind,
      source: "telegram",
      id: fileId,
    });
  }

  // ── Telegram Bot API helper ────────────────────────────────────────

  private async api(
    method: string,
    params?: Record<string, unknown>
  ): Promise<any> {
    const url = `${this.apiBase}/${method}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: params ? JSON.stringify(params) : undefined,
    });

    return response.json();
  }

  // ── Utilities ──────────────────────────────────────────────────────

  private chunkText(text: string, maxLen: number): string[] {
    if (text.length <= maxLen) return [text];

    const chunks: string[] = [];
    let remaining = text;

    while (remaining.length > 0) {
      if (remaining.length <= maxLen) {
        chunks.push(remaining);
        break;
      }

      // Try to break at a newline
      let breakAt = remaining.lastIndexOf("\n", maxLen);
      if (breakAt < maxLen * 0.3) {
        // No good newline break — break at space
        breakAt = remaining.lastIndexOf(" ", maxLen);
      }
      if (breakAt < maxLen * 0.3) {
        // No good break point — hard cut
        breakAt = maxLen;
      }

      chunks.push(remaining.slice(0, breakAt));
      remaining = remaining.slice(breakAt).trimStart();
    }

    return chunks;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
