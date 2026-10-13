import { people } from "@/data/people";
import { places } from "@/data/places";
import { states } from "@/data/states";
import type { Person, Place, StateInfo } from "@/data/types";
import { fold, sameName, textIncludes } from "@/lib/text";

const BLOCKED_WORDS = new Set([
  "hitler",
  "goebbels",
  "goering",
  "goring",
  "himmler",
  "bormann",
  "ribbentrop",
  "heydrich",
  "rohm",
  "speer",
  "keitel",
  "streicher",
  "mengele",
  "nazi",
  "nazis",
]);

const BLOCKED_PHRASES = [
  "adolf hitler",
  "rudolf hess",
  "martin bormann",
  "joseph goebbels",
  "hermann goering",
  "hermann goring",
  "heinrich himmler",
  "joachim von ribbentrop",
  "reinhard heydrich",
  "ernst rohm",
  "albert speer",
  "wilhelm keitel",
  "alfred rosenberg",
  "julius streicher",
  "baldur von schirach",
  "hans frank",
  "wilhelm frick",
  "josef mengele",
  "third reich",
];

export function isBlockedQuery(raw: string): boolean {
  const folded = fold(raw);
  if (!folded) return false;
  if (BLOCKED_PHRASES.some((phrase) => folded === phrase || folded.includes(phrase))) return true;
  const words = folded.split(/[^a-z0-9]+/).filter(Boolean);
  return words.some((word) => BLOCKED_WORDS.has(word));
}

function namesOfPerson(person: Person): string[] {
  return [person.name, person.germanName, ...(person.also ?? [])];
}

function namesOfPlace(place: Place): string[] {
  return [place.name, place.germanName, ...(place.also ?? [])];
}

function namesOfState(state: StateInfo): string[] {
  return [state.german, state.english, state.capital, state.capitalGerman];
}

export function isFinishedName(raw: string): boolean {
  const text = raw.trim();
  if (text.length < 2) return false;
  const pool = [
    ...people.flatMap(namesOfPerson),
    ...places.flatMap(namesOfPlace),
    ...states.flatMap(namesOfState),
  ];
  return pool.some((name) => sameName(name, text));
}

export type SearchHit =
  | { kind: "person"; person: Person }
  | { kind: "place"; place: Place }
  | { kind: "state"; state: StateInfo };

export function searchAll(raw: string): { blocked: boolean; hits: SearchHit[] } {
  const text = raw.trim();
  if (isBlockedQuery(text)) return { blocked: true, hits: [] };
  if (fold(text).length < 2) return { blocked: false, hits: [] };
  const hits: SearchHit[] = [];
  for (const person of people) {
    if (namesOfPerson(person).some((name) => textIncludes(name, text))) {
      hits.push({ kind: "person", person });
    }
  }
  for (const place of places) {
    if (namesOfPlace(place).some((name) => textIncludes(name, text))) {
      hits.push({ kind: "place", place });
    }
  }
  for (const state of states) {
    if (namesOfState(state).some((name) => textIncludes(name, text))) {
      hits.push({ kind: "state", state });
    }
  }
  return { blocked: false, hits };
}
