/**
 * Oh My Team — Channel Adapter Interface
 *
 * Every messaging platform (Telegram, Discord, Slack, etc.) implements this
 * interface. The router and bridge are platform-agnostic — they only talk
 * through this contract.
 */

// ── Adapter configuration ──────────────────────────────────────────────────

export interface AdapterConfig {
  /** Platform name: "telegram" | "discord" | "slack" */
  platform: string
  /** Platform-specific credentials and IDs */
  credentials: Record<string, string>
}

// ── Inbound message from a user ────────────────────────────────────────────

export interface InboundMessage {
  /** Platform-specific thread/topic/channel identifier */
  threadId: string
  /** The message text content */
  text: string
  /** Platform-specific sender identifier */
  senderId: string
  /** Human-readable sender name (for display) */
  senderName: string
  /** Original platform message ID (for replies, edits) */
  messageId: string
  /** ISO 8601 timestamp */
  timestamp: string
}

// ── Thread info returned when creating a session thread ────────────────────

export interface ThreadInfo {
  /** Platform-specific thread/topic/channel identifier */
  threadId: string
  /** Human-readable name shown in the platform UI */
  displayName: string
}

// ── Permission prompt forwarded to the user ────────────────────────────────

export interface PermissionPrompt {
  requestId: string
  toolName: string
  description: string
  inputPreview: string
}

// ── The adapter interface ──────────────────────────────────────────────────

export interface ChannelAdapter {
  /** Platform name for logging and config lookup */
  readonly name: string

  /**
   * Connect to the platform. Called once at router startup.
   * Should validate credentials and establish the connection.
   * Throws if credentials are invalid or connection fails.
   */
  connect(config: AdapterConfig): Promise<void>

  /**
   * Gracefully disconnect from the platform.
   * Called on router shutdown.
   */
  disconnect(): Promise<void>

  /**
   * Create a new thread/topic/channel for a project session.
   * @param sessionName - Used as the display name for the thread
   * @returns Thread info with the platform-specific ID
   */
  createThread(sessionName: string): Promise<ThreadInfo>

  /**
   * Close/archive a thread when a session stops.
   * Should NOT delete messages — just close or archive.
   * @param threadId - The ID returned by createThread
   */
  closeThread(threadId: string): Promise<void>

  /**
   * Send a text message to a specific thread.
   * Should handle message length limits (chunk if needed).
   * @param threadId - Target thread
   * @param text - Message content
   */
  send(threadId: string, text: string): Promise<void>

  /**
   * Send a permission prompt to a thread.
   * Platform can format this as buttons, inline keyboard, or plain text.
   * @param threadId - Target thread
   * @param prompt - Permission details including requestId
   */
  sendPermissionPrompt(threadId: string, prompt: PermissionPrompt): Promise<void>

  /**
   * Register a callback for incoming messages.
   * The adapter filters platform events and calls this for each valid message.
   * Adapter is responsible for sender gating (allowlist).
   * @param callback - Called with each valid inbound message
   */
  onMessage(callback: (message: InboundMessage) => void): void

  /**
   * Register a callback for permission responses (yes/no replies to prompts).
   * @param callback - Called with requestId and allow/deny decision
   */
  onPermissionResponse(
    callback: (requestId: string, allow: boolean) => void
  ): void

  /**
   * Get the thread ID that the hub session should listen on.
   * For Telegram: the General topic. For Discord: #omt-hub channel.
   * Returns null if hub thread detection is not supported.
   */
  getHubThreadId(): string | null
}
