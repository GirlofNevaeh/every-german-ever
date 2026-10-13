import { useNavigate } from "@tanstack/react-router";
import { BREMERHAVEN, GERMANY_VIEW, projectGermany, stateShapes } from "@/data/state-shapes";
import { getState, states } from "@/data/states";
import { places } from "@/data/places";

function spreadMarks(marks: { slug: string; x: number; y: number; label: string }[]) {
  const next = marks.map((mark) => ({ ...mark }));
  for (let pass = 0; pass < 12; pass += 1) {
    for (let i = 0; i < next.length; i += 1) {
      for (let j = i + 1; j < next.length; j += 1) {
        const dx = next[j].x - next[i].x;
        const dy = next[j].y - next[i].y;
        const distance = Math.hypot(dx, dy) || 0.001;
        if (distance < 0.32) {
          const push = (0.32 - distance) / 2;
          next[i].x -= (dx / distance) * push;
          next[i].y -= (dy / distance) * push;
          next[j].x += (dx / distance) * push;
          next[j].y += (dy / distance) * push;
        }
      }
    }
  }
  return next;
}

export function StateMap({ active }: { active?: string }) {
  const navigate = useNavigate();
  function open(slug: string) {
    void navigate({ to: "/states/$slug", params: { slug } });
  }
  return (
    <div>
      <svg viewBox={`-0.15 -0.15 ${GERMANY_VIEW.w + 0.3} ${GERMANY_VIEW.h + 0.3}`} className="mx-auto w-full max-w-lg" role="img" aria-label="Map of the 16 German states. North is at the top.">
        {stateShapes.map((shape) => {
          const state = getState(shape.slug);
          const label = state ? `${state.german}, ${state.english}` : shape.slug;
          const on = active === shape.slug;
          return (
            <path
              key={shape.slug}
              d={shape.d}
              role="link"
              tabIndex={0}
              aria-label={label}
              onClick={() => open(shape.slug)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  open(shape.slug);
                }
              }}
              className={on ? "fill-honey stroke-danube" : "fill-danube/15 stroke-danube hover:fill-linden"}
              strokeWidth={0.03}
            />
          );
        })}
        <circle
          cx={BREMERHAVEN.x}
          cy={BREMERHAVEN.y}
          r={0.12}
          role="link"
          tabIndex={0}
          aria-label="Bremerhaven, a separate piece of Bremen"
          className="fill-honey stroke-danube"
          strokeWidth={0.03}
          onClick={() => open("bremen")}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              open("bremen");
            }
          }}
        />
      </svg>
      <p className="mt-2 text-sm">North is at the top. The dot by the coast is Bremerhaven, a separate piece of Bremen.</p>
      <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {states.map((state) => (
          <li key={state.slug}>
            <button
              type="button"
              onClick={() => open(state.slug)}
              className="min-h-11 w-full rounded-lg border border-ink/15 px-2 text-left text-sm font-semibold"
            >
              {state.german}
              <span className="mt-0.5 block font-normal">{state.english}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PlaceMap() {
  const navigate = useNavigate();
  const marks = spreadMarks(
    places.map((place) => {
      const point = projectGermany(place.lon, place.lat);
      return { slug: place.slug, x: point.x, y: point.y, label: place.germanName };
    }),
  );
  return (
    <div>
      <svg viewBox={`-0.2 -0.2 ${GERMANY_VIEW.w + 0.4} ${GERMANY_VIEW.h + 0.4}`} className="mx-auto w-full max-w-lg" role="img" aria-label="Map of places in Germany. North is at the top.">
        {stateShapes.map((shape) => (
          <path key={shape.slug} d={shape.d} className="fill-danube/10 stroke-danube" strokeWidth={0.025} />
        ))}
        {marks.map((mark) => (
          <g key={mark.slug}>
            <circle
              cx={mark.x}
              cy={mark.y}
              r={0.12}
              role="link"
              tabIndex={0}
              aria-label={mark.label}
              className="fill-honey stroke-ink"
              strokeWidth={0.02}
              onClick={() => void navigate({ to: "/places/$slug", params: { slug: mark.slug } })}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  void navigate({ to: "/places/$slug", params: { slug: mark.slug } });
                }
              }}
            />
          </g>
        ))}
      </svg>
      <p className="mt-2 text-sm">North is at the top. Marks that stand very close are drawn a little apart, so you can tap each one.</p>
    </div>
  );
}
