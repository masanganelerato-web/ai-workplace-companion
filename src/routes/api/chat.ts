import { createFileRoute } from "@tanstack/react-router";
import { streamText } from "ai";
import { z } from "zod";
import { getGatewayModel } from "@/lib/ai-gateway.server";
import { CHAT_SYSTEM_PROMPT } from "@/lib/ai-prompts";

const BodySchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(10000),
      }),
    )
    .min(1)
    .max(60),
});

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let messages;
        try {
          messages = BodySchema.parse(await request.json()).messages;
        } catch {
          return new Response("Invalid request", { status: 400 });
        }

        try {
          const result = streamText({
            model: getGatewayModel(),
            system: CHAT_SYSTEM_PROMPT,
            messages,
          });
          return result.toTextStreamResponse();
        } catch (error) {
          const message = error instanceof Error ? error.message : "AI request failed";
          return new Response(message, { status: 500 });
        }
      },
    },
  },
});
