import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { MessagesSquare, Send, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Markdown } from "@/components/ai/Markdown";
import { Disclaimer } from "@/components/ai/Disclaimer";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Assistant Chat | Workplace AI" },
      {
        name: "description",
        content:
          "Chat with an AI workplace assistant for drafting, summarizing, planning and prioritizing work.",
      },
      { property: "og:title", content: "Assistant Chat | Workplace AI" },
      {
        property: "og:description",
        content: "A conversational assistant for everyday professional work.",
      },
    ],
  }),
  component: ChatPage,
});

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  "Rewrite this update so it sounds more confident.",
  "Help me prepare for a difficult performance conversation.",
  "Turn these three ideas into a one-page proposal outline.",
];

function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, streaming]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || streaming) return;

    const history: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages(history);
    setInput("");
    setError("");
    setStreaming(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!response.ok || !response.body) {
        throw new Error((await response.text()) || "The assistant is unavailable right now.");
      }

      setMessages([...history, { role: "assistant", content: "" }]);
      const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
      let acc = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += value;
        setMessages([...history, { role: "assistant", content: acc }]);
      }
    } catch (e) {
      setMessages(history);
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setStreaming(false);
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex items-start gap-3">
        <span className="gradient-hero flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-primary-foreground">
          <MessagesSquare className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-2xl font-semibold">Assistant Chat</h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Ask anything about your work — drafting, summarizing, planning or thinking a decision
            through.
          </p>
        </div>
      </header>

      <div className="surface-card flex h-[62vh] min-h-[420px] flex-col">
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {messages.length === 0 && !streaming && (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <Sparkles className="h-6 w-6 text-primary" />
              <p className="max-w-sm text-sm text-muted-foreground">
                Start a conversation, or try one of these:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-border bg-surface-2 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message, i) => (
            <div
              key={i}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={
                  message.role === "user"
                    ? "max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground"
                    : "max-w-[92%] rounded-2xl rounded-bl-sm border border-border bg-surface-2 px-4 py-3"
                }
              >
                {message.role === "user" ? (
                  message.content
                ) : message.content ? (
                  <Markdown>{message.content}</Markdown>
                ) : (
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Thinking…
                  </span>
                )}
              </div>
            </div>
          ))}

          {error && (
            <p className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </p>
          )}
          <div ref={endRef} />
        </div>

        <div className="space-y-2 border-t border-border p-4">
          <div className="flex items-end gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              rows={2}
              placeholder="Ask the assistant… (Enter to send, Shift+Enter for a new line)"
              className="resize-none bg-surface"
            />
            <Button onClick={() => send(input)} disabled={streaming || !input.trim()} size="lg">
              {streaming ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              <span className="sr-only">Send</span>
            </Button>
          </div>
          <Disclaimer />
        </div>
      </div>
    </div>
  );
}
