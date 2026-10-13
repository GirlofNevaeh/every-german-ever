import { createFileRoute, Link } from "@tanstack/react-router";
import { MemorialDrawing, PlaceDrawing } from "@/components/drawings";
import { PlaceMap, StateMap } from "@/components/germany-maps";
import { hasPhoto, Photo } from "@/components/photo";
import { places } from "@/data/places";

export const Route = createFileRoute("/places/")({
  head: () => ({ meta: [{ title: "Places · Every German Ever" }] }),
  component: PlacesPage,
});

function PlacesPage() {
  return (
    <main className="mx-auto grid max-w-6xl gap-8 px-4 py-6">
      <header className="grid gap-2">
        <h1 className="text-3xl text-danube">Places</h1>
        <p>Real stops, with their German names. North is at the top of each map.</p>
      </header>
      <section className="grid gap-3">
        <h2 className="text-2xl">A map of stops</h2>
        <PlaceMap />
      </section>
      <section className="grid gap-3" id="states">
        <h2 className="text-2xl">The 16 states</h2>
        <p>Tap a shape. These are the 16 states of Germany today.</p>
        <StateMap />
      </section>
      <ul className="grid gap-4 sm:grid-cols-2">
        {places.map((place) => (
          <li key={place.slug} className="rounded-lg border border-ink/15 p-3">
            {hasPhoto(place.photoId) ? (
              <Photo photoId={place.photoId} alt={place.photoAlt} />
            ) : place.slug === "memorial-berlin" ? (
              <MemorialDrawing />
            ) : (
              <PlaceDrawing label={place.germanName} />
            )}
            <Link to="/places/$slug" params={{ slug: place.slug }} className="mt-2 block font-serif text-xl no-underline">
              {place.germanName}
            </Link>
            <p>{place.name}</p>
            <p className="text-sm">{place.region}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
