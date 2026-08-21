import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mail,
  NotebookPen,
  ListChecks,
  Search,
  MessagesSquare,
  ArrowRight,
  Clock,
  ShieldCheck,
  Wand2,
} from "lucide-react";
import { Disclaimer } from "@/components/ai/Disclaimer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Automate daily work: generate emails, summarize meetings, plan tasks, research topics and chat with an AI assistant built for professionals.",
      },
      { property: "og:title", content: "AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content:
          "Emails, meeting summaries, task plans and research — structured AI outputs for professionals.",
      },
    ],
  }),
  component: Dashboard,
});

const tools = [
  {
    to: "/email",
    icon: Mail,
    title: "Smart Email Generator",
    description: "Tone- and audience-aware drafts with subject lines you can send.",
  },
  {
    to: "/notes",
    icon: NotebookPen,
    title: "Meeting Notes Summarizer",
    description: "Key points, decisions and an action table with owners and deadlines.",
  },
  {
    to: "/planner",
    icon: ListChecks,
    title: "AI Task Planner",
    description: "Impact-vs-urgency prioritization plus a realistic schedule.",
  },
  {
    to: "/research",
    icon: Search,
    title: "AI Research Assistant",
    description: "Insights, trade-offs, next steps and honest confidence notes.",
  },
  {
    to: "/chat",
    icon: MessagesSquare,
    title: "Assistant Chat",
    description: "A streaming conversation for anything that doesn't fit a form.",
  },
] as const;

const principles = [
  { icon: Wand2, label: "Structured prompts", detail: "Every tool uses a fixed output contract." },
  { icon: Clock, label: "Minutes, not hours", detail: "Drafts arrive ready to refine." },
  {
    icon: ShieldCheck,
    label: "Review-first",
    detail: "Unknowns are marked [to confirm], never invented.",
  },
];

function Dashboard() {
  return (
    <div className="space-y-8">
      <section className="surface-card overflow-hidden">
        <div className="gradient-hero px-6 py-10 text-primary-foreground lg:px-10 lg:py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-80">
            Workplace AI
          </p>
          <h1 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight lg:text-4xl">
            Automate the writing, summarizing and planning around your real work
          </h1>
          <p className="mt-3 max-w-xl text-sm opacity-90 lg:text-base">
            Five focused assistants with professional, structured outputs — built for people who
            spend their day in email, meetings and priorities.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/email"
              className="inline-flex items-center gap-2 rounded-lg bg-surface px-4 py-2 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5"
            >
              Draft an email <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 rounded-lg border border-primary-foreground/40 px-4 py-2 text-sm font-semibold transition-colors hover:bg-primary-foreground/10"
            >
              Open the chat
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {principles.map((item) => (
          <div key={item.label} className="surface-card flex items-start gap-3 p-4">
            <item.icon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold">{item.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{item.detail}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Your assistants</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {tools.map((tool) => (
            <Link
              key={tool.to}
              to={tool.to}
              className="surface-card group flex items-start gap-4 p-5 transition-all hover:-translate-y-0.5 hover:border-primary"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                <tool.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="flex items-center gap-1.5 font-semibold">
                  {tool.title}
                  <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{tool.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Disclaimer />
    </div>
  );
}
