import { createFileRoute } from "@tanstack/react-router";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Every German Ever" }] }),
  component: Home,
});

function Home() {
  const { text } = useLanguage();
  return (
    <main className="mx-auto grid max-w-3xl gap-4 px-4 py-10">
      <h1 className="text-3xl text-danube sm:text-4xl">{text("A history of Germany for young learners.")}</h1>
      <img
        src="/cartoon-brandenburg-gate.jpg?v=2"
        alt="A cartoon of the Brandenburg Gate"
        className="w-full rounded-lg border border-ink/15"
      />
      <p className="text-lg">{text("People, places, states, and a quiz, for Age 5-12.")}</p>
      <p>{text("Purchase access at Every School Ever.")}</p>
      <a
        href="https://everyschoolever.com"
        className="inline-flex min-h-11 w-fit items-center rounded-lg bg-honey px-4 font-semibold text-ink no-underline"
      >
        {text("Purchase access")}
      </a>
    </main>
  );
}
