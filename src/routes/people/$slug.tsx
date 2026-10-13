import { createFileRoute, Link } from "@tanstack/react-router";
import { CartoonPortrait } from "@/components/cartoon-portrait";
import { getPerson } from "@/data/people";

export const Route = createFileRoute("/people/$slug")({
  head: ({ params }) => ({
    meta: [{ title: `${getPerson(params.slug)?.name ?? "Person"} · Every German Ever` }],
  }),
  component: PersonPage,
});

function PersonPage() {
  const { slug } = Route.useParams();
  const person = getPerson(slug);
  if (!person) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-6">
        <h1 className="text-3xl text-danube">We cannot find that person.</h1>
        <Link to="/people" className="underline">
          Back to People
        </Link>
      </main>
    );
  }
  return (
    <main className="mx-auto grid max-w-3xl gap-4 px-4 py-6">
      <p>
        <Link to="/people" className="text-sm font-semibold underline decoration-honey underline-offset-4">
          All people
        </Link>
      </p>
      <div className="grid gap-4 sm:grid-cols-[14rem_1fr] sm:items-start">
        <CartoonPortrait slug={person.slug} name={person.name} />
        <div className="grid gap-2">
          <h1 className="text-3xl text-danube">{person.name}</h1>
          <p className="text-lg">{person.germanName}</p>
          <p className="font-semibold text-linden">{person.years}</p>
          <p>{person.knownFor}</p>
        </div>
      </div>
      {person.bio.map((line) => (
        <p key={line}>{line}</p>
      ))}
      <p>
        <span className="font-semibold">Places: </span>
        {person.places.join(", ")}
      </p>
      {person.inventions?.length ? (
        <section className="grid gap-2">
          <h2 className="text-xl">What they made</h2>
          {person.inventions.map((item) => (
            <p key={item.name}>
              <span className="font-semibold">{item.name}. </span>
              {item.shared ?? ""}
            </p>
          ))}
        </section>
      ) : null}
    </main>
  );
}
