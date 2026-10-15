import { cleanCredit, getPhoto } from "@/data/photos";
import { useLanguage } from "@/lib/language";

export function Photo({
  photoId,
  alt,
  className = "",
}: {
  photoId: string;
  alt: string;
  className?: string;
}) {
  const photo = getPhoto(photoId);
  const { text } = useLanguage();
  if (!photo) return null;
  return (
    <figure className={className}>
      <img src={photo.file} alt={alt} className="aspect-[3/2] w-full rounded-lg object-cover" />
      <figcaption className="mt-2 text-sm leading-snug text-ink">
        {text(`Photographer: ${cleanCredit(photo.photographer)}. Licence: ${photo.licence}.`)}{" "}
        <a href={photo.source} className="underline decoration-honey underline-offset-2">
          Source
        </a>
      </figcaption>
    </figure>
  );
}

export function hasPhoto(photoId?: string): boolean {
  return Boolean(photoId && getPhoto(photoId));
}
