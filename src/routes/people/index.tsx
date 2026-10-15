import { CartoonPortrait } from "@/components/cartoon-portrait";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SearchBox } from "@/components/search-box";
import { allInventions, people } from "@/data/people";
import { PERIOD_LABEL, PERIODS, ROLE_LABEL, ROLES, type Period, type Role } from "@/data/types";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/people/")({
  head: () => ({ meta: [{ title: "People · Every German Ever" }] }),
  component: PeoplePage,
});

function PeoplePage() {
  const [role, setRole] = useState<Role | "all">("all");
  const [period, setPeriod] = useState<Period | "all">("all");
  const { text } = useLanguage();
  const shown = useMemo(
    () =>
      people.filter(
        (person) =>
          (role === "all" || person.roles.includes(role)) && (period === "all" || person.period === period),
      ),
    [role, period],
  );
  const inventions = allInventions();

  function roleCount(next: Role) {
    return people.filter(
      (person) => person.roles.includes(next) && (period === "all" || person.period === period),
    ).length;
  }
  function periodCount(next: Period) {
    return people.filter(
      (person) => person.period === next && (role === "all" || person.roles.includes(role)),
    ).length;
  }

  return (
    <main className="mx-auto grid max-w-6xl gap-8 px-4 py-6">
      <header className="grid gap-3">
        <h1 className="text-3xl text-danube">People</h1>
        <p>{people.length} real people. Women and men. Tap a name to read a short life.</p>
        <SearchBox />
      </header>
      <div className="grid gap-3">
        <div className="flex flex-wrap gap-2">
          <FilterChip active={role === "all"} disabled={false} onClick={() => setRole("all")} label="All roles" />
          {ROLES.map((item) => {
            const count = roleCount(item);
            const disabled = count === 0;
            return (
              <FilterChip
                key={item}
                active={role === item}
                disabled={disabled}
                onClick={() => setRole(role === item ? "all" : item)}
                label={ROLE_LABEL[item]}
              />
            );
          })}
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterChip active={period === "all"} disabled={false} onClick={() => setPeriod("all")} label="All times" />
          {PERIODS.map((item) => {
            const count = periodCount(item);
            return (
              <FilterChip
                key={item}
                active={period === item}
                disabled={count === 0}
                onClick={() => setPeriod(period === item ? "all" : item)}
                label={PERIOD_LABEL[item]}
              />
            );
          })}
        </div>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {shown.map((person) => (
          <li key={person.slug} className="rounded-lg border border-ink/15 p-3">
            <div className="mb-2 w-24">
              <CartoonPortrait slug={person.slug} name={person.name} />
            </div>
            <Link to="/people/$slug" params={{ slug: person.slug }} className="font-serif text-xl no-underline">
              {person.name}
            </Link>
            <p className="text-sm">{person.germanName}</p>
            <p className="text-sm text-linden">{person.years}</p>
            <p className="mt-1">{text(person.knownFor)}</p>
          </li>
        ))}
      </ul>
      <section id="inventions" className="grid gap-3">
        <h2 className="text-2xl text-danube">Things they made</h2>
        <ul className="grid gap-3">
          {inventions.map((item) => (
            <li key={`${item.slug}-${item.name}`} className="rounded-lg border border-ink/15 p-3">
              <p className="font-semibold">{item.name}</p>
              <p>
                <Link to="/people/$slug" params={{ slug: item.slug }} className="font-semibold underline decoration-honey underline-offset-4">
                  {item.person}
                </Link>
              </p>
              {item.shared ? <p>{text(item.shared)}</p> : null}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

function FilterChip({
  label,
  active,
  disabled,
  onClick,
}: {
  label: string;
  active: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={
        "min-h-11 rounded-full border px-3 text-sm font-semibold " +
        (disabled
          ? "border-ink/15 text-ink/40"
          : active
            ? "border-linden bg-linden text-paper"
            : "border-danube text-danube")
      }
    >
      {label}
    </button>
  );
}
