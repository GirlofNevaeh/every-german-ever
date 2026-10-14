import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Every German Ever" }] }),
  component: Home,
});

const SECTIONS = [
  { to: "/people", label: "People" },
  { to: "/places", label: "Places" },
  { to: "/beliefs", label: "Beliefs" },
  { to: "/time", label: "Time" },
  { to: "/quiz", label: "Quiz" },
  { to: "/work", label: "Work" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
] as const;

function Home() {
  return (
    <main className="mx-auto grid max-w-2xl gap-4 px-4 py-10">
      <h1 className="text-3xl text-danube sm:text-4xl">A history of Germany for young learners.</h1>
      <p className="text-lg">People, places, states, and a quiz, for Age 5-12.</p>
      <div className="flex flex-wrap gap-2">
        {SECTIONS.map((section) => (
          <Link
            key={section.to}
            to={section.to}
            className="inline-flex min-h-11 items-center rounded-lg bg-honey px-4 font-semibold text-ink no-underline"
          >
            {section.label}
          </Link>
        ))}
      </div>
    </main>
  );
}
