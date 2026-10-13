import { createFileRoute, Link } from "@tanstack/react-router";
import { states } from "@/data/states";

export const Route = createFileRoute("/work")({
  validateSearch: (search: Record<string, unknown>) => ({
    sheet: typeof search.sheet === "string" ? search.sheet : "",
  }),
  head: () => ({ meta: [{ title: "Work · Every German Ever" }] }),
  component: WorkPage,
});

const ENGLISH_ORDER = [
  "Saxony",
  "Bremen",
  "Bavaria",
  "Hamburg",
  "Thuringia",
  "Berlin",
  "Hesse",
  "Saarland",
  "Lower Saxony",
  "Brandenburg",
  "Saxony-Anhalt",
  "Mecklenburg-Western Pomerania",
  "North Rhine-Westphalia",
  "Schleswig-Holstein",
  "Baden-Württemberg",
  "Rhineland-Palatinate",
];

const MATCH_PEOPLE = ["Johannes Gutenberg", "Johann Sebastian Bach", "Albrecht Dürer", "Ludwig van Beethoven", "Jacob Grimm", "Angela Merkel"];
const MATCH_PLACES = ["Bonn", "Hanau", "Leipzig", "Berlin", "Mainz", "Nürnberg"];

function WorkPage() {
  const { sheet } = Route.useSearch();
  const show = (id: string) => !sheet || sheet === id;
  return (
    <main className="mx-auto grid max-w-3xl gap-6 px-4 py-6">
      {!sheet ? (
        <header className="no-print grid gap-2">
          <h1 className="text-3xl text-danube">Work</h1>
          <p>Print a sheet. Take it to class.</p>
        </header>
      ) : null}
      {show("states") ? <StateSheet /> : null}
      {show("match") ? <MatchSheet /> : null}
      {show("timeline") ? <TimelineSheet /> : null}
      {show("anthem") ? <AnthemSheet /> : null}
    </main>
  );
}

function SheetNav({ id }: { id: string }) {
  return (
    <p className="no-print">
      <Link to="/work" search={{ sheet: id }} className="font-semibold underline decoration-honey underline-offset-4">
        Open this sheet
      </Link>
    </p>
  );
}

function StateSheet() {
  return (
    <article className="sheet grid gap-3 rounded-lg border border-ink/15 p-4">
      <h2 className="text-2xl">State word bank</h2>
      <p>Draw a line from each German name to its English name. Then use the names in a sentence of your own.</p>
      <div className="grid grid-cols-2 gap-4">
        <ul>
          {states.map((state) => (
            <li key={state.slug}>{state.german}</li>
          ))}
        </ul>
        <ul>
          {ENGLISH_ORDER.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
      <SheetNav id="states" />
    </article>
  );
}

function MatchSheet() {
  return (
    <article className="sheet grid gap-3 rounded-lg border border-ink/15 p-4">
      <h2 className="text-2xl">Who and where</h2>
      <p>Draw a line from the person to a place on this site that belongs with them.</p>
      <div className="grid grid-cols-2 gap-4">
        <ul>
          {MATCH_PEOPLE.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
        <ul>
          {MATCH_PLACES.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
      <SheetNav id="match" />
    </article>
  );
}

function TimelineSheet() {
  const bank = ["Mainz", "16", "1949", "1961", "1989", "1990", "Berlin"];
  return (
    <article className="sheet grid gap-3 rounded-lg border border-ink/15 p-4">
      <h2 className="text-2xl">Timeline with blanks</h2>
      <p>Word bank: {bank.join(", ")}</p>
      <ol className="list-decimal pl-5">
        <li>Gutenberg printed in ____.</li>
        <li>In ____ a wall in Berlin meant families could not cross freely.</li>
        <li>In ____ the wall opened.</li>
        <li>In ____ the country was one again.</li>
        <li>Two governments began in ____.</li>
        <li>Germany today has ____ states.</li>
        <li>The Bundestag meets in ____.</li>
      </ol>
      <SheetNav id="timeline" />
    </article>
  );
}

function AnthemSheet() {
  return (
    <article className="sheet grid gap-3 rounded-lg border border-ink/15 p-4">
      <h2 className="text-2xl">The national anthem</h2>
      <p>Germany sings only the third verse of the Deutschlandlied. This sheet prints that verse only.</p>
      <p>Hoffmann von Fallersleben wrote the words in 1841. Joseph Haydn wrote the tune earlier, for a different song.</p>
      <pre className="font-serif text-lg whitespace-pre-wrap">
        {`Einigkeit und Recht und Freiheit
Für das deutsche Vaterland!
Danach lasst uns alle streben
Brüderlich mit Herz und Hand!
Einigkeit und Recht und Freiheit
Sind des Glückes Unterpfand;
Blüh im Glanze dieses Glückes,
Blühe, deutsches Vaterland!
Blüh im Glanze dieses Glückes,
Blühe, deutsches Vaterland!`}
      </pre>
      <p>People sing it at sports and on national days.</p>
      <SheetNav id="anthem" />
    </article>
  );
}
