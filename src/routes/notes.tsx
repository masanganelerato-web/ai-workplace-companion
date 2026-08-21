import { createFileRoute } from "@tanstack/react-router";
import { NotebookPen } from "lucide-react";
import { AssistantWorkspace } from "@/components/ai/AssistantWorkspace";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer | Workplace AI" },
      {
        name: "description",
        content:
          "Turn raw meeting notes or transcripts into key points, decisions, owners and deadlines in seconds.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer | Workplace AI" },
      {
        property: "og:description",
        content: "Key points, decisions, action items and deadlines from any transcript.",
      },
    ],
  }),
  component: NotesPage,
});

function NotesPage() {
  return (
    <AssistantWorkspace
      feature="notes"
      title="Meeting Notes Summarizer"
      description="Paste messy notes or a transcript. You get an executive summary, decisions and an action table with owners and deadlines."
      inputLabel="Raw notes or transcript"
      placeholder="Paste your meeting notes here — bullet fragments, chat logs or a full transcript all work."
      selects={[
        { key: "audience", label: "Share with", options: ["Team", "Leadership", "Client", "Self"] },
        { key: "length", label: "Detail level", options: ["Concise", "Standard", "Thorough"] },
      ]}
      examples={[
        "Standup: Ana blocked on API keys, Ben shipping billing fix today, launch review moved to Thu 3pm, need legal sign-off before rollout.",
      ]}
      icon={<NotebookPen className="h-5 w-5" />}
    />
  );
}
