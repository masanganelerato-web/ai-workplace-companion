import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { AssistantWorkspace } from "@/components/ai/AssistantWorkspace";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator | Workplace AI" },
      {
        name: "description",
        content:
          "Draft professional workplace emails with tone and audience controls, plus a clear subject line and reasoning.",
      },
      { property: "og:title", content: "Smart Email Generator | Workplace AI" },
      {
        property: "og:description",
        content: "Tone- and audience-aware email drafting for busy professionals.",
      },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  return (
    <AssistantWorkspace
      feature="email"
      title="Smart Email Generator"
      description="Describe the situation and pick a tone and audience. You get a subject line, a ready-to-send body and a short rationale."
      inputLabel="What should the email accomplish?"
      placeholder="e.g. Tell the client the launch slips one week because QA found a payments bug, and propose a Thursday call."
      selects={[
        {
          key: "tone",
          label: "Tone",
          options: [
            "Professional",
            "Friendly",
            "Direct",
            "Diplomatic",
            "Persuasive",
            "Apologetic",
            "Formal",
          ],
        },
        {
          key: "audience",
          label: "Audience",
          options: [
            "Client",
            "Manager",
            "Direct report",
            "Cross-functional team",
            "Executive / board",
            "Vendor",
            "New prospect",
          ],
        },
        {
          key: "length",
          label: "Length",
          options: ["Short (under 100 words)", "Medium", "Detailed"],
        },
      ]}
      examples={[
        "Ask the design team for final assets before Friday's release freeze.",
        "Follow up politely on an unpaid invoice that is 14 days overdue.",
        "Decline a meeting invite and propose an async written update instead.",
      ]}
      icon={<Mail className="h-5 w-5" />}
    />
  );
}
