import type { Invention, Person } from "./types";
import { peopleA } from "./people-a";
import { peopleB } from "./people-b";
import { peopleC } from "./people-c";

export const people: Person[] = [...peopleA, ...peopleB, ...peopleC].sort((a, b) => {
  if (a.sortYear !== b.sortYear) return a.sortYear - b.sortYear;
  return a.name.localeCompare(b.name);
});

export function getPerson(slug: string): Person | undefined {
  return people.find((person) => person.slug === slug);
}

export type InventionRow = Invention & { slug: string; person: string };

export function allInventions(): InventionRow[] {
  return people.flatMap((person) =>
    (person.inventions ?? []).map((item) => ({
      ...item,
      slug: person.slug,
      person: person.name,
    })),
  );
}

export const SURPRISE_PEOPLE = people.filter((person) => person.slug !== "wernher-von-braun");
