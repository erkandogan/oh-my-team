#!/usr/bin/env node
/**
 * Oh My Team — Interactive Hub Init
 *
 * Modern interactive setup flow using @clack/prompts.
 * Replaces the numbered-prompt CLI with arrow-key navigation,
 * masked token inputs, live validation, and spinners.
 *
 * Called by bin/omt when `omt hub init` is run without flags.
 * Writes hub-config.json and exits — bash continues from there.
 *
 * Usage: node bin/hub-init.js <config-dir>
 *   config-dir: ~/.oh-my-team (where to write hub-config.json)
 */

import * as p from "@clack/prompts";
import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const CONFIG_DIR = process.argv[2] || path.join(process.env.HOME || ".", ".oh-my-team");
const CONFIG_PATH = path.join(CONFIG_DIR, "hub-config.json");

// ── Helpers ────────────────────────────────────────────────────────────

async function fetchJson(url: string, options?: RequestInit): Promise<any> {
  const response = await fetch(url, options);
  return response.json();
}

function writeConfig(config: object): void {
  mkdirSync(CONFIG_DIR, { recursive: true });
  writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
}

// ── Telegram flow ──────────────────────────────────────────────────────

async function setupTelegram(): Promise<boolean> {
  p.note(
    [
      "1. Open Telegram → search for @BotFather",
      "2. Send /newbot → pick a name and username",
      "3. Copy the bot token",
      "",
      "Important: also disable Group Privacy:",
      "  /mybots → your bot → Bot Settings → Group Privacy → Turn OFF",
    ].join("\n"),
    "Create a Telegram Bot"
  );

  const token = await p.text({
    message: "Bot token",
    placeholder: "123456789:ABCdef...",
    validate: (v) => {
      if (!v.trim()) return "Token is required";
      if (!v.includes(":")) return "Doesn't look like a bot token (missing colon)";
    },
  });
  if (p.isCancel(token)) return false;

  // Verify token
  const s1 = p.spinner();
  s1.start("Verifying bot token...");
  const me = await fetchJson(`https://api.telegram.org/bot${token}/getMe`);
  if (!me.ok) {
    s1.stop("Invalid token", 2);
    p.log.error(`Telegram said: ${me.description || "unknown error"}`);
    return false;
  }
  const botUsername = me.result.username;
  s1.stop(`Connected to @${botUsername}`);

  // Group setup instructions
  p.note(
    [
      `1. Create a new Telegram group (e.g., "Oh My Team Hub")`,
      `2. Add @${botUsername} to the group`,
      "3. Make the bot admin (Group Settings → Administrators → Add)",
      "4. Enable Topics (Group Settings → Topics → ON)",
      "5. Send any message in the group",
    ].join("\n"),
    "Set up the Telegram group"
  );

  await p.text({
    message: "Press Enter when done...",
    placeholder: "(the bot will detect your group automatically)",
    defaultValue: "",
  });

  // Detect chat ID
  const s2 = p.spinner();
  s2.start("Looking for your group...");
  const updates = await fetchJson(`https://api.telegram.org/bot${token}/getUpdates`);
  let chatId = "";
  let groupName = "";
  if (updates.ok && updates.result) {
    for (const update of [...updates.result].reverse()) {
      const chat = update.message?.chat;
      if (chat && (chat.type === "group" || chat.type === "supergroup")) {
        chatId = String(chat.id);
        groupName = chat.title || "Group";
        break;
      }
    }
  }

  if (!chatId) {
    s2.stop("Couldn't auto-detect", 2);
    const manual = await p.text({
      message: "Paste the Chat ID manually (starts with -100)",
      placeholder: "-100xxxxxxxxxx",
      validate: (v) => {
        if (!v.trim()) return "Chat ID is required";
        if (!v.startsWith("-")) return "Group chat IDs start with a minus sign";
      },
    });
    if (p.isCancel(manual)) return false;
    chatId = manual;
  } else {
    s2.stop(`Found: "${groupName}" (${chatId})`);
  }

  // Verify group access
  const s3 = p.spinner();
  s3.start("Verifying group access...");
  const chatInfo = await fetchJson(
    `https://api.telegram.org/bot${token}/getChat?chat_id=${chatId}`
  );
  if (!chatInfo.ok) {
    s3.stop("Cannot access group", 2);
    p.log.error("Make sure the bot is added to the group and is admin.");
    return false;
  }
  groupName = chatInfo.result.title || groupName || "Group";
  s3.stop(`Connected to "${groupName}"`);

  // Save
  writeConfig({
    platform: "telegram",
    credentials: { botToken: token, chatId },
  });

  p.note(
    [
      `Platform:  Telegram`,
      `Bot:       @${botUsername}`,
      `Group:     ${groupName} (${chatId})`,
      "",
      `Next: omt hub start`,
    ].join("\n"),
    "Hub configured!"
  );

  return true;
}

// ── Slack flow ─────────────────────────────────────────────────────────

async function setupSlack(): Promise<boolean> {
  // Generate the one-click manifest URL
  const manifest = {
    display_information: {
      name: "Oh My Team",
      description: "Multi-agent orchestration hub for Claude Code",
    },
    features: {
      bot_user: { display_name: "Oh My Team", always_online: true },
    },
    oauth_config: {
      scopes: {
        bot: [
          "chat:write", "channels:history", "channels:read",
          "groups:history", "groups:read", "pins:write", "users:read",
        ],
      },
    },
    settings: {
      event_subscriptions: { bot_events: ["message.channels", "message.groups"] },
      socket_mode_enabled: true,
      org_deploy_enabled: false,
      token_rotation_enabled: false,
    },
  };
  const manifestUrl =
    "https://api.slack.com/apps?new_app=1&manifest_json=" +
    encodeURIComponent(JSON.stringify(manifest));

  p.note(
    [
      "One-click setup — open this URL to create the app:",
      "",
      manifestUrl,
      "",
      "After creating the app:",
      "  a) Generate an App-Level Token:",
      "     Basic Information → App-Level Tokens → Generate",
      '     Name: "omt", Scope: connections:write',
      "  b) Install the app to your workspace:",
      "     OAuth & Permissions → Install to Workspace",
    ].join("\n"),
    "Create a Slack App"
  );

  const appToken = await p.text({
    message: "App-Level Token",
    placeholder: "xapp-...",
    validate: (v) => {
      if (!v.trim()) return "App Token is required";
      if (!v.startsWith("xapp-")) return "Must start with xapp-";
    },
  });
  if (p.isCancel(appToken)) return false;

  // Verify app token
  const s1 = p.spinner();
  s1.start("Verifying App Token...");
  const appCheck = await fetchJson("https://slack.com/api/apps.connections.open", {
    method: "POST",
    headers: { Authorization: `Bearer ${appToken}` },
  });
  if (!appCheck.ok) {
    s1.stop("Invalid App Token", 2);
    p.log.error(
      `${appCheck.error || "unknown error"}. Make sure Socket Mode is enabled and the token has connections:write scope.`
    );
    return false;
  }
  s1.stop("App Token valid");

  const botToken = await p.text({
    message: "Bot User OAuth Token",
    placeholder: "xoxb-...",
    validate: (v) => {
      if (!v.trim()) return "Bot Token is required";
      if (!v.startsWith("xoxb-")) return "Must start with xoxb-";
    },
  });
  if (p.isCancel(botToken)) return false;

  // Verify bot token
  const s2 = p.spinner();
  s2.start("Verifying Bot Token...");
  const auth = await fetchJson("https://slack.com/api/auth.test", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${botToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  if (!auth.ok) {
    s2.stop("Invalid Bot Token", 2);
    p.log.error(auth.error || "unknown error");
    return false;
  }
  const botName = auth.user || "bot";
  s2.stop(`Connected as @${botName}`);

  p.note(
    [
      `1. Create a channel (e.g., #omt) or use an existing one`,
      `2. Invite the bot: /invite @${botName}`,
      "3. Get the Channel ID:",
      "   Click channel name → scroll to bottom of About panel",
    ].join("\n"),
    "Channel setup"
  );

  const channelId = await p.text({
    message: "Channel ID",
    placeholder: "C0123ABC456",
    validate: (v) => {
      if (!v.trim()) return "Channel ID is required";
      if (!v.startsWith("C")) return "Channel IDs start with C";
    },
  });
  if (p.isCancel(channelId)) return false;

  // Verify channel
  const s3 = p.spinner();
  s3.start("Verifying channel access...");
  const chanInfo = await fetchJson(
    `https://slack.com/api/conversations.info?channel=${channelId}`,
    {
      headers: { Authorization: `Bearer ${botToken}` },
    }
  );
  if (!chanInfo.ok) {
    s3.stop("Cannot access channel", 2);
    p.log.error(`${chanInfo.error}. Make sure the bot is invited (/invite @${botName}).`);
    return false;
  }
  const channelName = chanInfo.channel?.name || "channel";
  s3.stop(`Connected to #${channelName}`);

  // Save
  writeConfig({
    platform: "slack",
    credentials: { botToken, appToken, channelId },
  });

  p.note(
    [
      `Platform:  Slack`,
      `Bot:       @${botName}`,
      `Channel:   #${channelName} (${channelId})`,
      "",
      `Next: omt hub start`,
    ].join("\n"),
    "Hub configured!"
  );

  return true;
}

// ── Main ───────────────────────────────────────────────────────────────

async function main() {
  p.intro("Oh My Team Hub Setup");

  const platform = await p.select({
    message: "Which platform?",
    options: [
      {
        value: "telegram",
        label: "Telegram",
        hint: "Forum topics for per-project threads",
      },
      {
        value: "slack",
        label: "Slack",
        hint: "Threads in a channel via Socket Mode",
      },
      {
        value: "discord",
        label: "Discord",
        hint: "coming soon",
      },
    ],
  });

  if (p.isCancel(platform)) {
    p.cancel("Setup cancelled.");
    process.exit(0);
  }

  if (platform === "discord") {
    p.log.warn("Discord adapter is not yet implemented. Stay tuned!");
    process.exit(0);
  }

  let success = false;
  if (platform === "telegram") {
    success = await setupTelegram();
  } else if (platform === "slack") {
    success = await setupSlack();
  }

  if (success) {
    p.outro("Run: omt hub start");
  } else {
    p.outro("Setup incomplete. Run omt hub init to try again.");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
