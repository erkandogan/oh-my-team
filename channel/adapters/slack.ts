/**
 * Oh My Team — Slack Adapter
 *
 * Implements ChannelAdapter for Slack using Socket Mode (WebSocket)
 * and threads within a single channel. Zero external dependencies —
 * raw WebSocket for Socket Mode, fetch for Web API.
 *
 * Channel setup:
 *   1. Create a Slack App with Socket Mode enabled
 *   2. Add bot scopes, subscribe to message.channels event
 *   3. Install to workspace, create a channel, invite bot
 *   4. Bot creates threads for each project session
 *   5. Channel root messages → hub session
 *   6. Thread replies → project sessions (via bridges)
 */

import type {
  ChannelAdapter,
  AdapterConfig,
  Attachment,
  InboundMessage,
  ThreadInfo,
  PermissionPrompt,
} from "./types";
import { saveAttachment } from "./media";

// ── Slack event types (minimal, only what we use) ─────────────────────

interface SlackEvent {
  type: string;
  subtype?: string;
  text?: string;
  user?: string;
  bot_id?: string;
  ts: string;
  thread_ts?: string;
  channel?: string;
  /** File uploads accompanying a message (images, PDFs, audio, etc.). */
  files?: SlackFile[];
}

interface SlackFile {
  id: string;
  name?: string;
  title?: string;
  mimetype?: string;
  filetype?: string;
  size?: number;
  /** Authenticated download URL. Requires `Authorization: Bearer <bot_token>`. */
  url_private_download?: string;
  /** Some tombstone/deleted file types arrive with mode="tombstone" — skip those. */
  mode?: string;
}

interface SlackApiResponse {
  ok: boolean;
  error?: string;
  ts?: string;
  url?: string;
  user?: string;
  user_id?: string;
  channel?: { name?: string };
  [key: string]: unknown;
}

// ── Permission response detection ─────────────────────────────────────

const PERMISSION_RE = /^\s*(y|yes|n|no)\s+([a-km-z]{5})\s*$/i;

// ── Adapter implementation ────────────────────────────────────────────

export class SlackAdapter implements ChannelAdapter {
  readonly name = "slack";

  private botToken = "";
  private appToken = "";
  private channelId = "";
  private botUserId = "";
  private ws: WebSocket | null = null;
  private connected = false;
  private reconnecting = false;

  private messageCallback: ((message: InboundMessage) => void) | null = null;
  private permissionCallback:
    | ((requestId: string, allow: boolean) => void)
    | null = null;

  // Cache user display names to avoid repeated API calls
  private userNameCache = new Map<string, string>();

  // ── Lifecycle ──────────────────────────────────────────────────────

  async connect(config: AdapterConfig): Promise<void> {
    this.botToken = config.credentials.botToken;
    this.appToken = config.credentials.appToken;
    this.channelId = config.credentials.channelId;

    if (!this.botToken || !this.appToken || !this.channelId) {
      throw new Error(
        "Slack adapter requires credentials.botToken, credentials.appToken, and credentials.channelId"
      );
    }

    // Verify bot token
    const auth = await this.api("auth.test");
    if (!auth.ok) {
      throw new Error(`Invalid bot token: ${auth.error}`);
    }
    this.botUserId = auth.user_id as string;

    // Verify channel access
    const channel = await this.api("conversations.info", {
      channel: this.channelId,
    });
    if (!channel.ok) {
      throw new Error(
        `Cannot access channel ${this.channelId}: ${channel.error}`
      );
    }

    const channelName =
      (channel as any).channel?.name || this.channelId;
    process.stderr.write(
      `omt-slack: Connected as @${auth.user} in #${channelName}\n`
    );

    // Start Socket Mode WebSocket connection
    this.connected = true;
    await this.connectSocket();
  }

  async disconnect(): Promise<void> {
    this.connected = false;
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  // ── Socket Mode (WebSocket) ────────────────────────────────────────

  private async connectSocket(): Promise<void> {
    // Get a fresh WebSocket URL using the App-Level Token
    const result = (await fetch(
      "https://slack.com/api/apps.connections.open",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.appToken}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    ).then((r) => r.json())) as SlackApiResponse;

    if (!result.ok || !result.url) {
      throw new Error(
        `Socket Mode connection failed: ${result.error || "no URL returned"}`
      );
    }

    return new Promise<void>((resolve, reject) => {
      const ws = new WebSocket(result.url as string);

      ws.onopen = () => {
        process.stderr.write("omt-slack: WebSocket connected\n");
      };

      ws.onmessage = (event) => {
        let data: any;
        try {
          data = JSON.parse(String(event.data));
        } catch {
          return;
        }

        // Log all incoming WebSocket frames for debugging
        process.stderr.write(
          `omt-slack: WS frame type=${data.type} envelope=${data.envelope_id || "none"}\n`
        );

        // "hello" = handshake complete, connection is live
        if (data.type === "hello") {
          process.stderr.write("omt-slack: Socket Mode ready\n");
          this.ws = ws;
          resolve();
          return;
        }

        // Slack asks us to reconnect (deploy, rebalance, etc.)
        if (data.type === "disconnect") {
          process.stderr.write(
            `omt-slack: Disconnect requested (${data.reason}), reconnecting...\n`
          );
          this.reconnect();
          return;
        }

        // Acknowledge envelope immediately — Slack requires ACK within 3 seconds
        if (data.envelope_id) {
          ws.send(JSON.stringify({ envelope_id: data.envelope_id }));
        }

        // Route events
        if (data.type === "events_api" && data.payload?.event) {
          this.handleEvent(data.payload.event as SlackEvent);
        }
      };

      ws.onclose = () => {
        if (this.connected && this.ws === ws) {
          process.stderr.write(
            "omt-slack: WebSocket closed, reconnecting...\n"
          );
          this.ws = null;
          this.reconnect();
        }
      };

      ws.onerror = (err) => {
        process.stderr.write(`omt-slack: WebSocket error: ${err}\n`);
        if (!this.ws) {
          reject(new Error("WebSocket connection failed"));
        }
      };
    });
  }

  private async reconnect(): Promise<void> {
    if (this.reconnecting || !this.connected) return;
    this.reconnecting = true;

    // Brief pause before reconnecting
    await this.sleep(2000);

    try {
      await this.connectSocket();
      process.stderr.write("omt-slack: Reconnected\n");
    } catch (err) {
      process.stderr.write(
        `omt-slack: Reconnect failed: ${err instanceof Error ? err.message : err}, retrying in 5s...\n`
      );
      await this.sleep(5000);
      this.reconnecting = false;
      if (this.connected) this.reconnect();
      return;
    }

    this.reconnecting = false;
  }

  // ── Event handling ─────────────────────────────────────────────────

  private async handleEvent(event: SlackEvent): Promise<void> {
    process.stderr.write(
      `omt-slack: Event type=${event.type} channel=${event.channel} user=${event.user || "none"} subtype=${event.subtype || "none"} text=${(event.text || "").slice(0, 50)}\n`
    );

    // Only handle messages in our channel
    if (event.type !== "message" || event.channel !== this.channelId) {
      process.stderr.write(`omt-slack: Filtered — wrong type/channel (want ${this.channelId})\n`);
      return;
    }

    // Ignore message subtype "file_share" for bot_id but let user file_share through.
    // The subtype "file_share" was deprecated; modern Slack sends regular messages
    // with a `files` array. We allow message-level subtype === "file_share" for back-compat.
    const isFileShare = event.subtype === "file_share";
    if (event.subtype && !isFileShare) return;
    if (event.bot_id) return;
    if (!event.user) return;

    // Allow empty text when there are files attached (media-only messages).
    const hasFiles = Array.isArray(event.files) && event.files.length > 0;
    if (!event.text && !hasFiles) return;

    // Ignore our own messages (safety net)
    if (event.user === this.botUserId) return;

    const text = (event.text || "").trim();

    // thread_ts present → thread reply, absent → channel root (hub)
    const threadId = event.thread_ts || "__general__";

    // Check if this is a permission response (e.g. "yes abc12")
    const permMatch = PERMISSION_RE.exec(text);
    if (permMatch && this.permissionCallback) {
      const allow = permMatch[1].toLowerCase().startsWith("y");
      const requestId = permMatch[2].toLowerCase();
      this.permissionCallback(requestId, allow);
      return;
    }

    // Get human-readable sender name
    const senderName = await this.getUserName(event.user);

    // Download any file uploads attached to this message.
    const attachments = hasFiles
      ? await this.downloadAttachments(event.files!, threadId)
      : [];

    if (!text && attachments.length === 0) return;

    // Forward as regular message
    if (this.messageCallback) {
      this.messageCallback({
        threadId,
        text,
        senderId: event.user,
        senderName,
        messageId: event.ts,
        timestamp: new Date(Number(event.ts) * 1000).toISOString(),
        attachments: attachments.length > 0 ? attachments : undefined,
      });
    }
  }

  // ── File downloading ───────────────────────────────────────────────

  private async downloadAttachments(
    files: SlackFile[],
    threadId: string
  ): Promise<Attachment[]> {
    const jobs = files.map((f) => this.downloadFile(f, threadId));
    const results = await Promise.all(jobs);
    return results.filter((x): x is Attachment => x !== null);
  }

  private async downloadFile(
    file: SlackFile,
    threadId: string
  ): Promise<Attachment | null> {
    // Skip tombstones (deleted uploads) and files with no downloadable URL.
    if (file.mode === "tombstone") return null;
    if (!file.url_private_download) {
      process.stderr.write(
        `omt-slack: ${file.id}: skipping — no private download URL\n`
      );
      return null;
    }

    return saveAttachment(file.url_private_download, threadId, {
      fallbackName: file.name || file.title || `file_${file.id}`,
      mimeType: file.mimetype,
      declaredSize: file.size,
      headers: { Authorization: `Bearer ${this.botToken}` },
      source: "slack",
      id: file.id,
    });
  }

  // ── Thread management ──────────────────────────────────────────────

  async createThread(sessionName: string): Promise<ThreadInfo> {
    // Post a parent message in the channel — its `ts` becomes the thread_ts
    // for all replies, effectively creating a thread
    const result = await this.api("chat.postMessage", {
      channel: this.channelId,
      text: `*Session: ${sessionName}*\nMessages in this thread go directly to the Claude session working on this project.`,
    });

    if (!result.ok) {
      throw new Error(
        `Failed to create thread for "${sessionName}": ${result.error}`
      );
    }

    const ts = result.ts as string;

    // Pin the session header for easy navigation in the channel
    await this.api("pins.add", {
      channel: this.channelId,
      timestamp: ts,
    }).catch(() => {
      // Non-critical — might fail without pins:write scope
    });

    return {
      threadId: ts,
      displayName: sessionName,
    };
  }

  async closeThread(threadId: string): Promise<void> {
    if (threadId === "__general__") return;

    // Post a closing message in the thread
    await this.api("chat.postMessage", {
      channel: this.channelId,
      thread_ts: threadId,
      text: "Session closed.",
    }).catch(() => {});

    // Unpin the session header
    await this.api("pins.remove", {
      channel: this.channelId,
      timestamp: threadId,
    }).catch(() => {});
  }

  async reopenThread(threadId: string, sessionName: string): Promise<void> {
    if (threadId === "__general__") return;

    // Post a resume notification in the existing thread
    await this.api("chat.postMessage", {
      channel: this.channelId,
      thread_ts: threadId,
      text: `Session "${sessionName}" resumed.`,
    }).catch(() => {});

    // Re-pin the session header for easy navigation
    await this.api("pins.add", {
      channel: this.channelId,
      timestamp: threadId,
    }).catch(() => {
      // Might already be pinned or lack scope — non-critical
    });
  }

  // ── Sending ────────────────────────────────────────────────────────

  async send(threadId: string, text: string): Promise<void> {
    // Slack has a ~4000 char limit per message — chunk if needed
    const chunks = this.chunkText(text, 3900);

    for (const chunk of chunks) {
      const params: Record<string, unknown> = {
        channel: this.channelId,
        text: chunk,
      };

      // Send as thread reply (not to channel root)
      if (threadId !== "__general__") {
        params.thread_ts = threadId;
      }

      await this.api("chat.postMessage", params);
    }
  }

  async sendPermissionPrompt(
    threadId: string,
    prompt: PermissionPrompt
  ): Promise<void> {
    const text = [
      `*Permission Request*`,
      `Tool: \`${prompt.toolName}\``,
      `Action: ${prompt.description}`,
      ``,
      `Reply \`yes ${prompt.requestId}\` or \`no ${prompt.requestId}\``,
    ].join("\n");

    const params: Record<string, unknown> = {
      channel: this.channelId,
      text,
    };

    if (threadId !== "__general__") {
      params.thread_ts = threadId;
    }

    await this.api("chat.postMessage", params);
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
    // Channel root messages (no thread_ts) map to "__general__",
    // same pattern as Telegram's General topic
    return null;
  }

  // ── Status indicators ─────────────────────────────────────────────

  async sendTypingIndicator(_threadId: string): Promise<void> {
    // Slack doesn't support typing indicators for bots — no-op
  }

  async sendStatusMessage(threadId: string, text: string): Promise<string> {
    const params: Record<string, unknown> = {
      channel: this.channelId,
      text,
    };
    if (threadId !== "__general__") {
      params.thread_ts = threadId;
    }
    const result = await this.api("chat.postMessage", params);
    return result.ts || "";
  }

  async updateStatusMessage(_threadId: string, messageId: string, text: string): Promise<void> {
    const result = await this.api("chat.update", {
      channel: this.channelId,
      ts: messageId,
      text,
    });
    if (!result.ok) {
      process.stderr.write(`omt-slack: chat.update failed: ${result.error}\n`);
    }
  }

  async deleteStatusMessage(_threadId: string, messageId: string): Promise<void> {
    await this.api("chat.delete", {
      channel: this.channelId,
      ts: messageId,
    }).catch(() => {});
  }

  // ── Slack Web API helper ───────────────────────────────────────────

  private async api(
    method: string,
    params?: Record<string, unknown>,
    /** Internal — prevents infinite retry loops. */
    _retried = false
  ): Promise<SlackApiResponse> {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${this.botToken}`,
    };

    let body: string | undefined;
    if (params) {
      // Use form-urlencoded — works reliably for all Slack Web API methods
      const form = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
        form.set(key, String(value));
      }
      body = form.toString();
      headers["Content-Type"] = "application/x-www-form-urlencoded; charset=utf-8";
    }

    const response = await fetch(`https://slack.com/api/${method}`, {
      method: "POST",
      headers,
      body,
    });

    const json = await response.json() as SlackApiResponse;

    // Slack rate limit: { ok: false, error: "ratelimited" } with a
    // Retry-After header (seconds). Retry once after waiting.
    if (!json.ok && json.error === "ratelimited" && !_retried) {
      const retryAfter = Number(response.headers.get("Retry-After")) || 1;
      process.stderr.write(
        `omt-slack: rate limited on ${method}, retrying in ${retryAfter}s\n`
      );
      await this.sleep(retryAfter * 1000);
      return this.api(method, params, true);
    }

    return json;
  }

  private async getUserName(userId: string): Promise<string> {
    const cached = this.userNameCache.get(userId);
    if (cached) return cached;

    try {
      const result = await this.api("users.info", { user: userId });
      const name =
        (result as any).user?.real_name ||
        (result as any).user?.name ||
        userId;
      this.userNameCache.set(userId, name);
      return name;
    } catch {
      return userId;
    }
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
        // No good newline — break at space
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
