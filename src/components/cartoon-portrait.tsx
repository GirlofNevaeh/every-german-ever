import { lookFor, type HairStyle, type Look } from "@/data/looks";

const SKIN: Record<Look["skin"], string> = {
  fair: "#F6D3B4",
  light: "#E7B98A",
  olive: "#C9845A",
};

const HAIR: Record<Look["hair"], string> = {
  black: "#2A211C",
  brown: "#5C3A24",
  blonde: "#E2C16A",
  red: "#A34B2A",
  grey: "#B7B1A8",
  white: "#F7F4EE",
};

function Hair({ style, color }: { style: HairStyle; color: string }) {
  if (style === "bald") {
    return <path d="M86 118c10-16 58-16 68 0" fill={color} />;
  }
  if (style === "veil") {
    return (
      <>
        <path d="M62 150c8-70 108-78 116 8 6 40-8 78-18 96H80c-12-28-24-64-18-104z" fill="#1C3D5A" />
        <path d="M96 108h48v18H96z" fill="#F6F0E4" />
      </>
    );
  }
  if (style === "wig") {
    return (
      <>
        <path d="M58 150c0-62 28-92 62-92s62 30 62 92c-16-28-36-36-62-36s-46 8-62 36z" fill={color} />
        <circle cx="72" cy="132" r="18" fill={color} />
        <circle cx="168" cy="132" r="18" fill={color} />
        <path d="M78 86c12-10 72-10 84 0" fill={color} />
      </>
    );
  }
  if (style === "wild") {
    return <path d="M64 132C36 48 78 18 120 30c40-22 92 16 64 104-16-42-34-28-64-36-28 8-42-8-56 34z" fill={color} />;
  }
  if (style === "long") {
    return <path d="M68 150C62 70 86 42 120 42s58 28 52 108c8 36 4 70-8 92H78c-14-24-18-58-10-92z" fill={color} />;
  }
  if (style === "shoulder" || style === "braids") {
    return (
      <>
        <path d="M70 148C66 78 88 46 120 46s54 32 50 102c6 28 2 48-4 62H76c-8-16-12-36-6-62z" fill={color} />
        {style === "braids" ? (
          <>
            <path d="M78 150c-6 28-2 52 4 70h14c-2-22 0-44 2-70z" fill={color} />
            <path d="M148 150c2 26 4 48 2 70h14c6-18 10-42 4-70z" fill={color} />
          </>
        ) : null}
      </>
    );
  }
  if (style === "bob") {
    return <path d="M66 156c-2-62 22-96 54-96s56 34 54 96c2 16-6 28-16 28H82c-10 0-18-12-16-28z" fill={color} />;
  }
  if (style === "bun") {
    return (
      <>
        <path d="M72 146c0-52 20-84 48-84s48 32 48 84c0 10-8 16-16 16H88c-8 0-16-6-16-16z" fill={color} />
        <circle cx="120" cy="62" r="22" fill={color} />
      </>
    );
  }
  if (style === "curly") {
    return (
      <>
        <path d="M70 140c0-48 22-78 50-78s50 30 50 78c8 8 8 22-2 28H74c-10-6-12-18-4-28z" fill={color} />
        <circle cx="78" cy="108" r="14" fill={color} />
        <circle cx="162" cy="108" r="14" fill={color} />
        <circle cx="96" cy="78" r="14" fill={color} />
        <circle cx="144" cy="78" r="14" fill={color} />
      </>
    );
  }
  if (style === "ponytail") {
    return (
      <>
        <path d="M74 142c2-50 20-76 46-76s44 26 46 76c0 8-8 14-14 14H88c-6 0-14-6-14-14z" fill={color} />
        <path d="M132 78c22-4 36 20 28 48-4 16-8 36-6 52h16c8-20 10-46 2-68-8-22-22-38-40-32z" fill={color} />
      </>
    );
  }
  if (style === "side") {
    return <path d="M74 146c2-58 18-86 58-86 28 0 42 22 44 58 8 10 6 28-8 32-20-24-40-20-70-8-8 4-22 8-24 4z" fill={color} />;
  }
  if (style === "crop") {
    return <path d="M80 132c2-28 16-46 40-46s38 18 40 46c0 6-8 8-12 6-8-16-16-22-28-22s-20 6-28 22c-4 2-12 0-12-6z" fill={color} />;
  }
  return <path d="M72 146c0-56 20-88 48-88s48 32 48 88c0 12-10 18-18 16-8-20-16-28-30-28s-22 8-30 28c-8 2-18-4-18-16z" fill={color} />;
}

export function CartoonPortrait({ slug, name }: { slug: string; name: string }) {
  const portrait = lookFor(slug);
  const skin = SKIN[portrait.skin];
  const hair = HAIR[portrait.hair];
  return (
    <svg viewBox="0 0 240 280" role="img" aria-label={name} className="aspect-[6/7] w-full rounded-lg border border-ink/15 bg-paper">
      <rect width="240" height="280" fill="#F6F0E4" />
      <path d="M48 250c18-62 126-62 144 0" fill="#1C3D5A" />
      <path d="M96 176h48l8 74H88z" fill={skin} />
      <g stroke={portrait.hair === "white" || portrait.hair === "blonde" ? "#8A7040" : "none"} strokeWidth="1.5">
        <Hair style={portrait.style} color={hair} />
      </g>
      <circle cx="78" cy="150" r="10" fill={skin} />
      <circle cx="162" cy="150" r="10" fill={skin} />
      <ellipse cx="120" cy="146" rx="48" ry="54" fill={skin} />
      {portrait.style !== "bald" && portrait.style !== "veil" ? <path d="M84 112c10-14 62-14 72 0-10 8-62 8-72 0z" fill={hair} /> : null}
      <circle cx="104" cy="146" r="4" fill="#1A1814" />
      <circle cx="136" cy="146" r="4" fill="#1A1814" />
      <path d="M108 172c8 8 16 8 24 0" fill="none" stroke="#1A1814" strokeWidth="2" strokeLinecap="round" />
      {portrait.face === "beard" ? <path d="M92 168c4 36 52 36 56 0-8 10-48 10-56 0z" fill={hair} /> : null}
      {portrait.face === "mustache" ? <path d="M100 164c8 8 32 8 40 0-10 6-30 6-40 0z" fill={hair} /> : null}
      {portrait.face === "sideburns" ? (
        <>
          <path d="M80 140c8 16 6 28-2 36" fill="none" stroke={hair} strokeWidth="6" />
          <path d="M160 140c-8 16-6 28 2 36" fill="none" stroke={hair} strokeWidth="6" />
        </>
      ) : null}
      {portrait.glasses ? (
        <>
          <circle cx="104" cy="146" r="12" fill="none" stroke="#1A1814" strokeWidth="2" />
          <circle cx="136" cy="146" r="12" fill="none" stroke="#1A1814" strokeWidth="2" />
          <path d="M116 146h8" stroke="#1A1814" strokeWidth="2" />
        </>
      ) : null}
    </svg>
  );
}
