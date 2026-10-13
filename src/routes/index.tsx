import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Every German Ever" }] }),
  component: Home,
});

function Home() {
  return (
    <main className="mx-auto grid max-w-2xl gap-4 px-4 py-10">
      <h1 className="text-3xl text-danube sm:text-4xl">A history of Germany for primary school.</h1>
      <p className="text-lg">People, places, states, and a quiz, for ages 5 to 12.</p>
      <p>Purchase access at Every School Ever.</p>
      <a
        href="https://everyschoolever.com"
        className="inline-flex min-h-11 w-fit items-center rounded-lg bg-honey px-4 font-semibold text-ink no-underline"
      >
        Purchase access
      </a>
    </main>
  );
}
