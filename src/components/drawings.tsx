/** Original mark. It is a drawing, not a photograph of a person. */
export function PersonDrawing({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .filter((part) => part[0] && part[0] === part[0].toUpperCase() && /[A-Za-zÄÖÜäöü]/.test(part[0]))
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
  return (
    <figure>
      <svg viewBox="0 0 240 280" role="img" aria-label={`Drawing for ${name}, not a photograph`} className="aspect-[6/7] w-full rounded-lg border border-ink/15 bg-danube/10">
        <title>Drawing, not a photograph</title>
        <rect x="18" y="18" width="204" height="244" rx="16" className="fill-paper stroke-danube" strokeWidth="3" />
        <path d="M120 78c18 0 28 16 28 32 0 22-14 36-28 36s-28-14-28-36c0-16 10-32 28-32z" className="fill-linden" />
        <path d="M120 54c8 14 8 22 0 34-8-12-8-20 0-34z" className="fill-honey" />
        <path d="M96 150h48c16 28 16 62 0 86H96c-16-24-16-58 0-86z" className="fill-danube" />
        <text x="120" y="214" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="28" className="fill-paper">
          {initials || "·"}
        </text>
      </svg>
      <figcaption className="mt-2 text-sm text-ink">Drawing, not a photograph.</figcaption>
    </figure>
  );
}

export function PlaceDrawing({ label }: { label: string }) {
  return (
    <figure>
      <svg viewBox="0 0 320 200" role="img" aria-label={`Drawing of ${label}, not a photograph`} className="aspect-[8/5] w-full rounded-lg border border-ink/15 bg-danube/10">
        <title>Drawing, not a photograph</title>
        <rect width="320" height="200" className="fill-paper" />
        <path d="M0 150h320" className="stroke-danube" strokeWidth="3" />
        <path d="M40 150 L70 90 L100 150 Z" className="fill-linden" />
        <path d="M90 150 L130 70 L170 150 Z" className="fill-danube" />
        <rect x="190" y="100" width="70" height="50" className="fill-honey" />
        <path d="M185 100 L225 70 L265 100 Z" className="fill-danube" />
        <circle cx="250" cy="48" r="14" className="fill-honey" />
      </svg>
      <figcaption className="mt-2 text-sm text-ink">Drawing, not a photograph.</figcaption>
    </figure>
  );
}

/** Stone slabs of the Berlin memorial. A drawing, not a photograph. */
export function MemorialDrawing() {
  const slabs = [28, 46, 70, 38, 84, 52, 66, 34, 78, 44, 60, 30];
  return (
    <figure>
      <svg viewBox="0 0 320 200" role="img" aria-label="Drawing of the memorial's stone field, not a photograph" className="aspect-[8/5] w-full rounded-lg border border-ink/15 bg-paper">
        <title>Drawing, not a photograph</title>
        <rect width="320" height="200" className="fill-paper" />
        {slabs.map((height, index) => (
          <rect
            key={height + index}
            x={16 + index * 25}
            y={170 - height}
            width="16"
            height={height}
            className={index % 2 === 0 ? "fill-danube" : "fill-linden"}
          />
        ))}
      </svg>
      <figcaption className="mt-2 text-sm text-ink">Drawing of the stone field, not a photograph.</figcaption>
    </figure>
  );
}