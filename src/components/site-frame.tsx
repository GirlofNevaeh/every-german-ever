import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

const TABS = [
  { to: "/", label: "Home", exact: true },
  { to: "/people", label: "People", exact: false },
  { to: "/places", label: "Places", exact: false },
  { to: "/beliefs", label: "Beliefs", exact: false },
  { to: "/time", label: "Time", exact: false },
  { to: "/quiz", label: "Quiz", exact: false },
  { to: "/work", label: "Work", exact: false },
  { to: "/about", label: "About", exact: false },
  { to: "/projects", label: "Projects", exact: false },
] as const;

export function SiteFrame({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="sticky top-0 z-40 border-b border-ink/15 bg-paper">
        <div className="bg-danube text-paper">
          <div className="mx-auto max-w-6xl px-4 py-2">
            <p className="font-serif text-2xl leading-tight font-semibold tracking-tight sm:text-3xl">
              Every German Ever
            </p>
            <p className="mt-1 font-serif text-sm leading-tight text-honey sm:text-base">Deutschland für alle</p>
          </div>
        </div>
        <nav aria-label="Sections" className="mx-auto grid max-w-6xl grid-cols-3">
          {TABS.map((tab) => {
            const active = tab.exact ? pathname === tab.to : pathname === tab.to || pathname.startsWith(`${tab.to}/`);
            return (
              <Link
                key={tab.to}
                to={tab.to}
                aria-current={active ? "page" : undefined}
                className={
                  "flex min-h-11 items-center justify-center border-b-2 px-1 text-center text-sm leading-tight font-semibold text-ink no-underline sm:text-base " +
                  (active ? "border-honey text-linden" : "border-transparent")
                }
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </header>
      {children}
      <footer className="border-t border-ink/15 bg-paper">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>Germany today is one country of 16 states. Austria and Switzerland are different countries.</p>
          <Link to="/about" className="font-semibold underline decoration-honey underline-offset-4">
            Read about that
          </Link>
        </div>
      </footer>
    </div>
  );
}
