import { Info } from "lucide-react";
import { AI_DISCLAIMER } from "@/lib/ai-prompts";

export function Disclaimer({ className = "" }: { className?: string }) {
  return (
    <p
      className={`flex items-center gap-2 text-xs text-muted-foreground ${className}`}
      role="note"
    >
      <Info className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      {AI_DISCLAIMER}
    </p>
  );
}
