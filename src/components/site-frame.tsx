import type { ReactNode } from "react";

export function SiteFrame({ children }: { children: ReactNode }) {
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
      </header>
      {children}
      <footer className="border-t border-ink/15 bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm">
          <p>Germany today is one country of 16 states. Austria and Switzerland are different countries.</p>
        </div>
      </footer>
    </div>
  );
}
