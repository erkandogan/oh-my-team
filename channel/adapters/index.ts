/**
 * Oh My Team — Adapter Registry
 *
 * Central registry of available channel adapters.
 * Add new adapters here as they are implemented.
 */

export type { ChannelAdapter, AdapterConfig, InboundMessage, ThreadInfo, PermissionPrompt } from "./types";
export { TelegramAdapter } from "./telegram";
export { SlackAdapter } from "./slack";

// Future:
// export { DiscordAdapter } from "./discord";
