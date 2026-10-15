import { createFileRoute, Link } from "@tanstack/react-router";
import { StateMap } from "@/components/germany-maps";
import { getState } from "@/data/states";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/states/$slug")({
  head: ({ params }) => ({
    meta: [{ title: `${getState(params.slug)?.german ?? "State"} · Every German Ever` }],
  }),
  component: StatePage,
});

function StatePage() {
  const { slug } = Route.useParams();
  const state = getState(slug);
  const { text } = useLanguage();
  if (!state) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-6">
        <h1 className="text-3xl text-danube">We cannot find that state.</h1>
        <Link to="/places">Back to Places</Link>
      </main>
    );
  }
  return (
    <main className="mx-auto grid max-w-3xl gap-4 px-4 py-6">
      <Link to="/places" hash="states" className="text-sm font-semibold underline decoration-honey underline-offset-4">
        All states
      </Link>
      <h1 className="text-3xl text-danube">{state.german}</h1>
      <p className="text-lg">{state.english}</p>
      <p>
        <span className="font-semibold">Capital: </span>
        {state.capitalGerman}
        {state.capitalGerman !== state.capital ? ` · ${state.capital}` : ""}
      </p>
      <p>{text(state.land)}</p>
      <ul className="list-disc pl-5">
        {state.facts.map((fact) => (
          <li key={fact}>{text(fact)}</li>
        ))}
      </ul>
      {state.slug === "bremen" ? (
        <p>Bremen has a separate piece at Bremerhaven. The dot on the map shows it.</p>
      ) : null}
      <StateMap active={state.slug} />
    </main>
  );
}
