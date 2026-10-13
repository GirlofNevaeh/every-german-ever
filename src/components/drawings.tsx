export function PlaceDrawing({ label }: { label: string }) {
  return (
    <figure>
      <svg viewBox="0 0 320 200" role="img" aria-label={label} className="aspect-[8/5] w-full rounded-lg border border-ink/15 bg-danube/10">
        <rect width="320" height="200" className="fill-paper" />
        <path d="M0 150h320" className="stroke-danube" strokeWidth="3" />
        <path d="M40 150 L70 90 L100 150 Z" className="fill-linden" />
        <path d="M90 150 L130 70 L170 150 Z" className="fill-danube" />
        <rect x="190" y="100" width="70" height="50" className="fill-honey" />
        <path d="M185 100 L225 70 L265 100 Z" className="fill-danube" />
        <circle cx="250" cy="48" r="14" className="fill-honey" />
      </svg>
    </figure>
  );
}

export function MemorialDrawing() {
  const slabs = [28, 46, 70, 38, 84, 52, 66, 34, 78, 44, 60, 30];
  return (
    <figure>
      <svg viewBox="0 0 320 200" role="img" aria-label="Stone field of the memorial in Berlin" className="aspect-[8/5] w-full rounded-lg border border-ink/15 bg-paper">
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
    </figure>
  );
}