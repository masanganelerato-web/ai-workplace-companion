import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { streamText } from "ai";
import { getGatewayModel } from "./ai-gateway.server";
import { buildPrompt } from "./ai-prompts";

const AssistantSchema = z.object({
  feature: z.enum(["email", "notes", "planner", "research"]),
  input: z.string().min(1).max(20000),
  tone: z.string().max(60).optional(),
  audience: z.string().max(60).optional(),
  length: z.string().max(60).optional(),
  timeframe: z.string().max(60).optional(),
  depth: z.string().max(60).optional(),
});

export const generateAssistantOutput = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => AssistantSchema.parse(input))
  .handler(async ({ data }) => {
    const { system, prompt } = buildPrompt(data);
    const result = streamText({ model: getGatewayModel(), system, prompt });
    return { text: await result.text };
  });
