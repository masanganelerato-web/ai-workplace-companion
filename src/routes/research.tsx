import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { AssistantWorkspace } from "@/components/ai/AssistantWorkspace";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant | Workplace AI" },
      {
        name: "description",
        content:
          "Get structured insights, trade-offs and next steps on any business or technical question, with confidence notes.",
      },
      { property: "og:title", content: "AI Research Assistant | Workplace AI" },
      {
        property: "og:description",
        content: "Structured insights, trade-offs and next steps with explicit confidence gaps.",
      },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  return (
    <AssistantWorkspace
      feature="research"
      title="AI Research Assistant"
      description="Ask a business or technical question. You get a TL;DR, key insights, trade-offs, next steps and an honest note on what to verify."
      inputLabel="Research question or topic"
      placeholder="e.g. What should a 50-person SaaS company consider before moving from monthly to annual billing?"
      selects={[
        {
          key: "depth",
          label: "Depth",
          options: ["Quick scan", "Balanced", "Deep analysis"],
        },
        {
          key: "audience",
          label: "Written for",
          options: ["Executive summary", "Practitioner", "Non-technical stakeholder"],
        },
      ]}
      examples={[
        "Compare build vs buy for an internal analytics dashboard at a mid-size company.",
        "Key risks of adopting AI note-taking tools in a regulated industry.",
      ]}
      icon={<Search className="h-5 w-5" />}
    />
  );
}
