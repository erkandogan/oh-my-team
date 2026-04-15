#!/usr/bin/env bun
/**
 * Oh My Team — Bridge
 *
 * MCP channel server that runs inside each project's Claude Code session.
 * Completely platform-agnostic: communicates with the router via HTTP.
 *
 * Env vars (set by omt CLI when starting the session):
 *   BRIDGE_PORT      - HTTP port this bridge listens on (e.g., 8801)
 *   ROUTER_URL       - Router HTTP endpoint (default: http://localhost:8800)
 *   SESSION_NAME     - Name of this session (e.g., "my-app")
 *
 * Message flow:
 *   Inbound:  Router POST /message → bridge → MCP notification → Claude
 *   Outbound: Claude → reply tool → bridge → Router POST /reply → adapter → user
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

// ── Configuration ──────────────────────────────────────────────────────────

const BRIDGE_PORT = Number(process.env.BRIDGE_PORT);
const ROUTER_URL = process.env.ROUTER_URL || "http://localhost:8800";
const SESSION_NAME = process.env.SESSION_NAME || "unnamed";

if (!BRIDGE_PORT || isNaN(BRIDGE_PORT)) {
  process.stderr.write(
    "omt-bridge: BRIDGE_PORT env var is required and must be a number\n"
  );
  process.exit(1);
}

// ── Attachment formatting ──────────────────────────────────────────────────

interface ChannelAttachment {
  path: string;
  name: string;
  mimeType: string;
  size: number;
  kind: string;
}

/**
 * Compose a channel message that makes attachments visible to the session.
 *
 * The user's original caption/text comes first. Below it we include a
 * structured block listing each file with its local path and metadata so
 * Claude can use the Read tool to view any that are relevant.
 *
 * The XML-ish tags are easy for the model to parse and unlikely to collide
 * with normal prose. We intentionally avoid putting raw paths on a bare
 * line so nothing looks like a command.
 */
function formatContentWithAttachments(
  text: string,
  attachments: ChannelAttachment[]
): string {
  const lines: string[] = [];
  if (text) {
    lines.push(text);
    lines.push("");
  }
  lines.push(`<attachments count="${attachments.length}">`);
  for (const a of attachments) {
    lines.push(
      `  <file kind="${a.kind}" name="${escapeAttr(a.name)}" mime="${escapeAttr(a.mimeType)}" size="${a.size}" path="${escapeAttr(a.path)}" />`
    );
  }
  lines.push(`</attachments>`);
  lines.push("");
  lines.push(
    `(The user shared ${attachments.length === 1 ? "a file" : `${attachments.length} files`} — use the Read tool on any of the paths above to view the contents.)`
  );
  return lines.join("\n");
}

function escapeAttr(value: string): string {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ── MCP Server ─────────────────────────────────────────────────────────────

const mcp = new Server(
  { name: "omt-bridge", version: "1.0.0" },
  {
    capabilities: {
      experimental: {
        "claude/channel": {},
        "claude/channel/permission": {},
      },
      tools: {},
    },
    instructions: [
      `Messages arrive as <channel source="omt-bridge" session="${SESSION_NAME}" sender="...">`,
      "These are from the user via a messaging platform (Telegram, Slack, etc.).",
      "Reply using the reply tool. Keep replies concise — they go to a chat app, not a terminal.",
      "For long code output, summarize and mention the file path instead of pasting full content.",
      "Permission prompts are forwarded to the user automatically.",
      "When a message contains an <attachments> block, the listed paths are files the user shared.",
      "Use the Read tool on those paths to view images, PDFs, or other content the user attached.",
    ].join(" "),
  }
);

// ── Reply tool ─────────────────────────────────────────────────────────────

mcp.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "reply",
      description:
        "Send a message back to the user through the messaging platform. " +
        "Keep messages concise and readable on a phone screen.",
      inputSchema: {
        type: "object" as const,
        properties: {
          text: {
            type: "string",
            description: "The message to send. Markdown is supported on most platforms.",
          },
        },
        required: ["text"],
      },
    },
  ],
}));

mcp.setRequestHandler(CallToolRequestSchema, async (req) => {
  if (req.params.name !== "reply") {
    throw new Error(`Unknown tool: ${req.params.name}`);
  }

  const { text } = req.params.arguments as { text: string };

  if (!text || typeof text !== "string") {
    throw new Error("reply tool requires a non-empty 'text' argument");
  }

  try {
    const response = await fetch(`${ROUTER_URL}/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionName: SESSION_NAME, text }),
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Router responded ${response.status}: ${body}`);
    }

    return { content: [{ type: "text" as const, text: "sent" }] };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    process.stderr.write(`omt-bridge: reply failed: ${message}\n`);
    return {
      content: [{ type: "text" as const, text: `reply failed: ${message}` }],
      isError: true,
    };
  }
});

// ── Permission relay ───────────────────────────────────────────────────────

const PermissionRequestSchema = z.object({
  method: z.literal("notifications/claude/channel/permission_request"),
  params: z.object({
    request_id: z.string(),
    tool_name: z.string(),
    description: z.string(),
    input_preview: z.string(),
  }),
});

mcp.setNotificationHandler(PermissionRequestSchema, async ({ params }) => {
  try {
    await fetch(`${ROUTER_URL}/permission-request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionName: SESSION_NAME,
        requestId: params.request_id,
        toolName: params.tool_name,
        description: params.description,
        inputPreview: params.input_preview,
      }),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    process.stderr.write(
      `omt-bridge: permission request forward failed: ${message}\n`
    );
  }
});

// ── Connect to Claude Code ─────────────────────────────────────────────────

await mcp.connect(new StdioServerTransport());
process.stderr.write(
  `omt-bridge: session="${SESSION_NAME}" port=${BRIDGE_PORT} router=${ROUTER_URL}\n`
);

// ── HTTP server: receives messages from router ─────────────────────────────

Bun.serve({
  port: BRIDGE_PORT,
  hostname: "127.0.0.1",

  async fetch(req) {
    const url = new URL(req.url);

    // Health check
    if (req.method === "GET" && url.pathname === "/health") {
      return Response.json({ status: "ok", session: SESSION_NAME });
    }

    // Inbound message from router
    if (req.method === "POST" && url.pathname === "/message") {
      try {
        const body = await req.json();
        const { content, sender, senderId, messageId, timestamp, attachments } = body as {
          content: string;
          sender: string;
          senderId: string;
          messageId?: string;
          timestamp?: string;
          attachments?: Array<{
            path: string;
            name: string;
            mimeType: string;
            size: number;
            kind: string;
          }>;
        };

        const hasAttachments = Array.isArray(attachments) && attachments.length > 0;
        const text = typeof content === "string" ? content : "";

        // Require at least one of: text content or at least one attachment.
        // (Users can send photo-only messages with no caption.)
        if (!text && !hasAttachments) {
          return Response.json(
            { error: "content or attachments required" },
            { status: 400 }
          );
        }

        // Compose the channel content: original text first, then a structured
        // attachments block so Claude can Read the files directly.
        const finalContent = hasAttachments
          ? formatContentWithAttachments(text, attachments!)
          : text;

        await mcp.notification({
          method: "notifications/claude/channel",
          params: {
            content: finalContent,
            meta: {
              session: SESSION_NAME,
              sender: sender || "unknown",
              sender_id: senderId || "",
              message_id: messageId || "",
              ts: timestamp || new Date().toISOString(),
              attachments: hasAttachments ? attachments : undefined,
            },
          },
        });

        return Response.json({ status: "delivered" });
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        process.stderr.write(`omt-bridge: message delivery failed: ${message}\n`);
        return Response.json({ error: message }, { status: 500 });
      }
    }

    // Permission response from router (user replied yes/no)
    if (req.method === "POST" && url.pathname === "/permission-response") {
      try {
        const body = await req.json();
        const { requestId, allow } = body as {
          requestId: string;
          allow: boolean;
        };

        await mcp.notification({
          method: "notifications/claude/channel/permission",
          params: {
            request_id: requestId,
            behavior: allow ? "allow" : "deny",
          },
        });

        return Response.json({ status: "applied" });
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        process.stderr.write(
          `omt-bridge: permission response failed: ${message}\n`
        );
        return Response.json({ error: message }, { status: 500 });
      }
    }

    return Response.json({ error: "not found" }, { status: 404 });
  },
});
