import { createFileRoute, Link } from "@tanstack/react-router";
import { MemorialDrawing, PlaceDrawing } from "@/components/drawings";
import { hasPhoto, Photo } from "@/components/photo";
import { getPlace } from "@/data/places";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/places/$slug")({
  head: ({ params }) => ({
    meta: [{ title: `${getPlace(params.slug)?.germanName ?? "Place"} · Every German Ever` }],
  }),
  component: PlacePage,
});

function PlacePage() {
  const { slug } = Route.useParams();
  const place = getPlace(slug);
  const { text } = useLanguage();
  if (!place) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-6">
        <h1 className="text-3xl text-danube">We cannot find that place.</h1>
        <Link to="/places">Back to Places</Link>
      </main>
    );
  }
  return (
    <main className="mx-auto grid max-w-3xl gap-4 px-4 py-6">
      <Link to="/places" className="text-sm font-semibold underline decoration-honey underline-offset-4">
        All places
      </Link>
      <h1 className="text-3xl text-danube">{place.germanName}</h1>
      <p className="text-lg">{place.name}</p>
      <p>{place.region}</p>
      {hasPhoto(place.photoId) ? (
        <Photo photoId={place.photoId} alt={place.photoAlt} />
      ) : place.slug === "memorial-berlin" ? (
        <MemorialDrawing />
      ) : (
        <PlaceDrawing label={place.name} />
      )}
      {place.lines.map((line) => (
        <p key={line}>{text(line)}</p>
      ))}
    </main>
  );
}
