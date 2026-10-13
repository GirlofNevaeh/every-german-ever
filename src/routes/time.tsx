import { createFileRoute } from "@tanstack/react-router";
import { timeline } from "@/data/timeline";

export const Route = createFileRoute("/time")({
  head: () => ({ meta: [{ title: "Time · Every German Ever" }] }),
  component: TimePage,
});

function TimePage() {
  return (
    <main className="mx-auto grid max-w-6xl gap-4 px-4 py-6">
      <h1 className="text-3xl text-danube">Time</h1>
      <p>Read from left to right, from the first farmers to now.</p>
      <div className="overflow-x-auto pb-4">
        <ol className="flex min-w-max items-stretch gap-3">
          {timeline.map((event) => (
            <li
              key={event.id}
              id={event.id}
              className="flex w-64 flex-col gap-2 rounded-lg border border-ink/15 bg-paper p-3"
            >
              <p className="text-sm font-semibold text-linden">{event.year}</p>
              <h2 className="text-xl">{event.title}</h2>
              <p>{event.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
