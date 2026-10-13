/** Lowercase, strip accents, turn ß into ss. Müller and Muller both become "muller". */
export function fold(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/** Also treat ae/oe/ue as umlauts, so Mueller finds Müller. */
export function foldLoose(value: string): string {
  return fold(value).replace(/ae/g, "a").replace(/oe/g, "o").replace(/ue/g, "u");
}

export function sameName(a: string, b: string): boolean {
  return fold(a) === fold(b) || foldLoose(a) === foldLoose(b);
}

export function textIncludes(haystack: string, needle: string): boolean {
  const n = fold(needle);
  const loose = foldLoose(needle);
  if (n.length < 2) return false;
  return fold(haystack).includes(n) || foldLoose(haystack).includes(loose);
}
