import type { ReactNode } from "react";
import { useLanguage, type Lang } from "@/lib/language";

const LANGUAGES: Array<{ id: Lang; label: string }> = [
  { id: "en", label: "English" },
  { id: "en-US", label: "American English" },
];

export function SiteFrame({ children }: { children: ReactNode }) {
  const { lang, setLang, text } = useLanguage();

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="sticky top-0 z-40 border-b border-ink/15 bg-paper">
        <div className="bg-danube text-paper">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-serif text-2xl leading-tight font-semibold tracking-tight sm:text-3xl">
                Every German Ever
              </p>
              <p className="mt-1 font-serif text-sm leading-tight text-honey sm:text-base">Deutschland für alle</p>
            </div>
            <div className="flex flex-wrap gap-2 pb-1" role="group" aria-label="Language">
              {LANGUAGES.map((item) => {
                const active = lang === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setLang(item.id)}
                    className={
                      "inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold " +
                      (active ? "bg-honey text-ink" : "bg-paper/15 text-paper")
                    }
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>
      {children}
      <footer className="border-t border-ink/15 bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm">
          <p>{text("Germany today is one country of 16 states. Austria and Switzerland are different countries.")}</p>
        </div>
      </footer>
    </div>
  );
}
