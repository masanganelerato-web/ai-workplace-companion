import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { AssistantWorkspace } from "@/components/ai/AssistantWorkspace";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner | Workplace AI" },
      {
        name: "description",
        content:
          "Turn a messy task dump into a prioritized plan with time estimates and a realistic schedule.",
      },
      { property: "og:title", content: "AI Task Planner | Workplace AI" },
      {
        property: "og:description",
        content: "Prioritization, time estimates and scheduling for your working day.",
      },
    ],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  return (
    <AssistantWorkspace
      feature="planner"
      title="AI Task Planner"
      description="Dump everything on your plate. The planner ranks by impact and urgency, estimates effort and lays out a workable schedule."
      inputLabel="Tasks, deadlines and constraints"
      placeholder="e.g. Finish Q3 deck (due Wed), 1:1s with 3 reports, review 2 PRs, fix invoice dispute, gym at 6pm, no meetings before 10am."
      selects={[
        {
          key: "timeframe",
          label: "Timeframe",
          options: ["Today", "Tomorrow", "This week", "Next two weeks"],
        },
        {
          key: "depth",
          label: "Working style",
          options: ["Deep-focus blocks", "Balanced", "Meeting-heavy day", "Quick wins first"],
        },
      ]}
      examples={[
        "Board deck due Friday, hiring loop feedback overdue, 40 unread emails, roadmap workshop prep, expense report.",
      ]}
      icon={<ListChecks className="h-5 w-5" />}
    />
  );
}
