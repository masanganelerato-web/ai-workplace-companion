import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  Mail,
  NotebookPen,
  ListChecks,
  Search,
  MessagesSquare,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { Disclaimer } from "@/components/ai/Disclaimer";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email", label: "Email Generator", icon: Mail },
  { to: "/notes", label: "Meeting Notes", icon: NotebookPen },
  { to: "/planner", label: "Task Planner", icon: ListChecks },
  { to: "/research", label: "Research", icon: Search },
  { to: "/chat", label: "Assistant Chat", icon: MessagesSquare },
] as const;

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="flex flex-col gap-1">
      {nav.map((item) => {
        const active = pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
              active
                ? "bg-sidebar-primary text-sidebar-primary-foreground font-semibold"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col gap-6 p-4">
      <Link to="/" onClick={onNavigate} className="flex items-center gap-2.5 px-2 pt-1">
        <span className="gradient-hero flex h-9 w-9 items-center justify-center rounded-lg">
          <Sparkles className="h-4.5 w-4.5 text-primary-foreground" aria-hidden="true" />
        </span>
        <span className="leading-tight">
          <span className="block font-display text-sm font-semibold text-sidebar-foreground">
            Workplace AI
          </span>
          <span className="block text-[11px] text-sidebar-foreground/60">
            Productivity Assistant
          </span>
        </span>
      </Link>

      <NavItems onNavigate={onNavigate} />

      <div className="mt-auto rounded-lg bg-sidebar-accent/60 p-3">
        <p className="text-[11px] leading-relaxed text-sidebar-foreground/70">
          Structured prompts keep every output consistent, concise and ready for work.
        </p>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="hidden bg-sidebar lg:sticky lg:top-0 lg:block lg:h-screen">
        <SidebarContent />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close navigation"
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setOpen(false)}
          />
          <div className="relative h-full w-[260px] bg-sidebar">
            <button
              aria-label="Close navigation"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 rounded-md p-1.5 text-sidebar-foreground/70 hover:bg-sidebar-accent"
            >
              <X className="h-4 w-4" />
            </button>
            <SidebarContent onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-border bg-surface/85 px-4 py-3 backdrop-blur lg:px-8">
          <button
            aria-label="Open navigation"
            onClick={() => setOpen(true)}
            className="rounded-md p-2 text-foreground hover:bg-muted lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Disclaimer className="ml-auto" />
        </header>

        <main className="flex-1 px-4 py-6 lg:px-8 lg:py-10">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
