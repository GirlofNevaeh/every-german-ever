import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PROJECT_STAGES, projects } from "@/data/projects";

export const Route = createFileRoute("/projects")({
  head: () => ({ meta: [{ title: "Projects · Every German Ever" }] }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [stage, setStage] = useState<string>("all");
  const [kind, setKind] = useState<"all" | "individual" | "team">("all");
  const shown = projects.filter(
    (item) => (stage === "all" || item.stage === stage) && (kind === "all" || item.kind === kind),
  );
  return (
    <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6">
      <h1 className="text-3xl text-danube">Projects</h1>
      <p>Use facts from this site. Age 5-6 is drawing and speaking.</p>
      <div className="flex flex-wrap gap-2">
        <Chip active={stage === "all"} onClick={() => setStage("all")} label="All years" />
        {PROJECT_STAGES.map((item) => (
          <Chip key={item} active={stage === item} onClick={() => setStage(item)} label={item} />
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <Chip active={kind === "all"} onClick={() => setKind("all")} label="Individual and team" />
        <Chip active={kind === "individual"} onClick={() => setKind("individual")} label="Individual" />
        <Chip active={kind === "team"} onClick={() => setKind("team")} label="Team" />
      </div>
      <ul className="grid gap-4 sm:grid-cols-2">
        {shown.map((item) => (
          <li key={item.id} className="grid gap-2 rounded-lg border border-ink/15 p-4">
            <p className="text-sm font-semibold text-linden">
              {item.stage} · {item.kind === "team" ? "Team" : "Individual"}
            </p>
            <h2 className="text-xl">{item.title}</h2>
            <p>
              <span className="font-semibold">What you need: </span>
              {item.need}
            </p>
            <ol className="list-decimal pl-5">
              {item.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p>
              <span className="font-semibold">You are done when: </span>
              {item.done}
            </p>
            {item.note ? <p>{item.note}</p> : null}
          </li>
        ))}
      </ul>
    </main>
  );
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "min-h-11 rounded-full border px-3 text-sm font-semibold " +
        (active ? "border-linden bg-linden text-paper" : "border-danube text-danube")
      }
    >
      {label}
    </button>
  );
}
