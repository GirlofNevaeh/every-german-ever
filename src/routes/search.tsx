import { createFileRoute, Link } from "@tanstack/react-router";
import { SearchBox } from "@/components/search-box";
import { CRUEL_YEARS_TEXT } from "@/data/timeline";
import { isBlockedQuery, searchAll } from "@/lib/find";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  head: () => ({ meta: [{ title: "Search · Every German Ever" }] }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const blocked = q ? isBlockedQuery(q) : false;
  const hits = q && !blocked ? searchAll(q).hits : [];
  return (
    <main className="mx-auto grid max-w-3xl gap-4 px-4 py-6">
      <h1 className="text-3xl text-danube">Search</h1>
      <SearchBox initial={q} />
      {!q ? <p>Type a name, then press Send.</p> : null}
      {q && blocked ? (
        <section className="rounded-lg border border-ink/15 p-4">
          <p>{CRUEL_YEARS_TEXT}</p>
          <Link to="/time" hash="1933" className="mt-2 inline-block font-semibold underline decoration-honey underline-offset-4">
            Open that time
          </Link>
        </section>
      ) : null}
      {q && !blocked ? (
        hits.length === 0 ? (
          <p>No people, places, or states match those words.</p>
        ) : (
          <ul className="grid gap-3">
            {hits.map((hit) => {
              if (hit.kind === "person") {
                return (
                  <li key={`p-${hit.person.slug}`} className="rounded-lg border border-ink/15 p-3">
                    <p className="text-sm text-linden">Person</p>
                    <Link to="/people/$slug" params={{ slug: hit.person.slug }} className="font-serif text-xl no-underline">
                      {hit.person.name}
                    </Link>
                    <p>{hit.person.germanName}</p>
                  </li>
                );
              }
              if (hit.kind === "place") {
                return (
                  <li key={`l-${hit.place.slug}`} className="rounded-lg border border-ink/15 p-3">
                    <p className="text-sm text-linden">Place</p>
                    <Link to="/places/$slug" params={{ slug: hit.place.slug }} className="font-serif text-xl no-underline">
                      {hit.place.germanName}
                    </Link>
                    <p>{hit.place.name}</p>
                  </li>
                );
              }
              return (
                <li key={`s-${hit.state.slug}`} className="rounded-lg border border-ink/15 p-3">
                  <p className="text-sm text-linden">State</p>
                  <Link to="/states/$slug" params={{ slug: hit.state.slug }} className="font-serif text-xl no-underline">
                    {hit.state.german}
                  </Link>
                  <p>{hit.state.english}</p>
                </li>
              );
            })}
          </ul>
        )
      ) : null}
    </main>
  );
}
