import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About · Every German Ever" }] }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="mx-auto grid max-w-3xl gap-4 px-4 py-6">
      <h1 className="text-3xl text-danube">About</h1>
      <p>Germany today is one country of 16 states.</p>
      <p>Parliament, the Bundestag, meets in Berlin.</p>
      <p>The Basic Law is the set of rules that protects people's rights.</p>
      <p>From 1949 to 1990 there were two governments, one in the west and one in the east.</p>
      <p>Austria is a different country. Switzerland is a different country. German is spoken in those places too, and that does not make them Germany.</p>
      <p>A person born in a town that is now in Poland, France, or another country is named with the town then and the country now.</p>
      <p>The borders of Germany today are these 16 states. Older borders are not those borders.</p>
      <p>Many children in Germany have family from other countries. They belong in today's Germany.</p>
    </main>
  );
}
