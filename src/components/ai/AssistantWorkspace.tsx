import { useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Sparkles, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Markdown } from "@/components/ai/Markdown";
import { Disclaimer } from "@/components/ai/Disclaimer";
import { generateAssistantOutput } from "@/lib/ai.functions";
import type { AssistantFeature } from "@/lib/ai-prompts";

export interface SelectField {
  key: "tone" | "audience" | "length" | "timeframe" | "depth";
  label: string;
  options: string[];
}

interface Props {
  feature: AssistantFeature;
  title: string;
  description: string;
  inputLabel: string;
  placeholder: string;
  selects: SelectField[];
  examples?: string[];
  icon: ReactNode;
}

export function AssistantWorkspace({
  feature,
  title,
  description,
  inputLabel,
  placeholder,
  selects,
  examples = [],
  icon,
}: Props) {
  const generate = useServerFn(generateAssistantOutput);
  const [input, setInput] = useState("");
  const [options, setOptions] = useState<Record<string, string>>(
    Object.fromEntries(selects.map((s) => [s.key, s.options[0] as string])),
  );
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function onGenerate() {
    if (!input.trim() || loading) return;
    setLoading(true);
    setError("");
    setOutput("");
    try {
      const result = await generate({ data: { feature, input: input.trim(), ...options } });
      setOutput(result.text);
    } catch (e) {
      setError(
        e instanceof Error && e.message
          ? e.message
          : "The assistant could not complete this request. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function onCopy() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="space-y-6">
      <header className="flex items-start gap-3">
        <span className="gradient-hero flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-primary-foreground">
          {icon}
        </span>
        <div>
          <h1 className="text-2xl font-semibold">{title}</h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <section className="surface-card space-y-4 p-5">
          {selects.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-2">
              {selects.map((field) => (
                <div key={field.key} className="space-y-1.5">
                  <Label htmlFor={field.key}>{field.label}</Label>
                  <select
                    id={field.key}
                    value={options[field.key]}
                    onChange={(e) =>
                      setOptions((prev) => ({ ...prev, [field.key]: e.target.value }))
                    }
                    className="h-9 w-full rounded-md border border-input bg-surface px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="assistant-input">{inputLabel}</Label>
            <Textarea
              id="assistant-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
              rows={10}
              className="resize-y bg-surface"
            />
          </div>

          {examples.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {examples.map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => setInput(example)}
                  className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                >
                  {example.length > 46 ? `${example.slice(0, 46)}…` : example}
                </button>
              ))}
            </div>
          )}

          <Button onClick={onGenerate} disabled={loading || !input.trim()} className="w-full">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Generating…
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" /> Generate
              </>
            )}
          </Button>
          <Disclaimer />
        </section>

        <section className="surface-card flex min-h-[320px] flex-col p-5">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Output
            </h2>
            {output && (
              <Button variant="outline" size="sm" onClick={onCopy}>
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            )}
          </div>

          {loading && (
            <div className="space-y-3" aria-live="polite">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          )}

          {!loading && error && (
            <p className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </p>
          )}

          {!loading && !error && !output && (
            <p className="m-auto max-w-xs text-center text-sm text-muted-foreground">
              Your structured, review-ready draft will appear here.
            </p>
          )}

          {!loading && output && <Markdown>{output}</Markdown>}
        </section>
      </div>
    </div>
  );
}
