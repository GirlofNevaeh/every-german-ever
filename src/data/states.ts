import type { StateInfo } from "./types";

export const states: StateInfo[] = [
  {
    slug: "baden-wuerttemberg",
    german: "Baden-Württemberg",
    english: "Baden-Württemberg",
    capital: "Stuttgart",
    capitalGerman: "Stuttgart",
    land: "Hills, the Black Forest, and the river Rhine.",
    facts: [
      "The Schwarzwald, the Black Forest, is in this state.",
      "Heidelberg sits on the river Neckar.",
    ],
  },
  {
    slug: "bayern",
    german: "Bayern",
    english: "Bavaria",
    capital: "Munich",
    capitalGerman: "München",
    land: "Alps in the south, farms, forests, and rivers.",
    facts: [
      "The capital is München, Munich.",
      "The Zugspitze, Germany's highest peak, is here.",
    ],
  },
  {
    slug: "berlin",
    german: "Berlin",
    english: "Berlin",
    capital: "Berlin",
    capitalGerman: "Berlin",
    land: "A city-state of rivers, parks, and wide streets.",
    facts: [
      "Berlin is Germany's capital city and its own state.",
      "The Bundestag meets here.",
    ],
  },
  {
    slug: "brandenburg",
    german: "Brandenburg",
    english: "Brandenburg",
    capital: "Potsdam",
    capitalGerman: "Potsdam",
    land: "Pine forests, lakes, and sandy fields around Berlin.",
    facts: [
      "Sanssouci palace is in Potsdam.",
      "Berlin sits inside this land, but Berlin is a different state.",
    ],
  },
  {
    slug: "bremen",
    german: "Bremen",
    english: "Bremen",
    capital: "Bremen",
    capitalGerman: "Bremen",
    land: "A city-state with a port, and a separate piece on the sea.",
    facts: [
      "Bremen has a separate piece at Bremerhaven, on the North Sea.",
      "The Town Musicians of Bremen are a story, not a news report.",
    ],
  },
  {
    slug: "hamburg",
    german: "Hamburg",
    english: "Hamburg",
    capital: "Hamburg",
    capitalGerman: "Hamburg",
    land: "A city-state and a great harbour on the river Elbe.",
    facts: [
      "Ships sail from the North Sea up the Elbe to the docks.",
      "Hamburg is one of the three city-states, with Berlin and Bremen.",
    ],
  },
  {
    slug: "hessen",
    german: "Hessen",
    english: "Hesse",
    capital: "Wiesbaden",
    capitalGerman: "Wiesbaden",
    land: "Woods, the river Main, and busy Frankfurt.",
    facts: [
      "The capital is Wiesbaden, not Frankfurt.",
      "The Brothers Grimm were born in Hanau, in Hessen.",
    ],
  },
  {
    slug: "mecklenburg-vorpommern",
    german: "Mecklenburg-Vorpommern",
    english: "Mecklenburg-Western Pomerania",
    capital: "Schwerin",
    capitalGerman: "Schwerin",
    land: "Lakes inland and a long Baltic coast.",
    facts: [
      "There are more than a thousand lakes.",
      "The coast faces the Baltic Sea, die Ostsee.",
    ],
  },
  {
    slug: "niedersachsen",
    german: "Niedersachsen",
    english: "Lower Saxony",
    capital: "Hanover",
    capitalGerman: "Hannover",
    land: "North Sea coast, heath, and the river Weser.",
    facts: [
      "Hannover, Hanover, is the capital.",
      "The Wadden Sea touches this coast, and islands sit offshore.",
    ],
  },
  {
    slug: "nordrhein-westfalen",
    german: "Nordrhein-Westfalen",
    english: "North Rhine-Westphalia",
    capital: "Düsseldorf",
    capitalGerman: "Düsseldorf",
    land: "The Rhine, the Ruhr, and many large cities.",
    facts: [
      "More people live here than in any other state.",
      "Köln, Cologne, is in this state.",
    ],
  },
  {
    slug: "rheinland-pfalz",
    german: "Rheinland-Pfalz",
    english: "Rhineland-Palatinate",
    capital: "Mainz",
    capitalGerman: "Mainz",
    land: "The Rhine and the Moselle, with vineyards on the slopes.",
    facts: [
      "Gutenberg printed in Mainz.",
      "The Lorelei rock stands on the Rhine in this state.",
    ],
  },
  {
    slug: "saarland",
    german: "Saarland",
    english: "Saarland",
    capital: "Saarbrücken",
    capitalGerman: "Saarbrücken",
    land: "A small state of woods and the river Saar, beside France.",
    facts: [
      "It is the smallest state that is not a city.",
      "France is next door. France is a different country.",
    ],
  },
  {
    slug: "sachsen",
    german: "Sachsen",
    english: "Saxony",
    capital: "Dresden",
    capitalGerman: "Dresden",
    land: "The river Elbe, old cities, and hills near the Czech border.",
    facts: [
      "Dresden and Leipzig are its best-known cities.",
      "Meissen porcelain was first made in this state.",
    ],
  },
  {
    slug: "sachsen-anhalt",
    german: "Sachsen-Anhalt",
    english: "Saxony-Anhalt",
    capital: "Magdeburg",
    capitalGerman: "Magdeburg",
    land: "The Elbe plain, with Wittenberg and old cathedral towns.",
    facts: [
      "Wittenberg, where Luther taught, is here.",
      "Otto von Guericke showed the power of air in Magdeburg.",
    ],
  },
  {
    slug: "schleswig-holstein",
    german: "Schleswig-Holstein",
    english: "Schleswig-Holstein",
    capital: "Kiel",
    capitalGerman: "Kiel",
    land: "A land between the North Sea and the Baltic Sea.",
    facts: [
      "Lübeck's old brick gate is in this state.",
      "The Wadden Sea lies along the western coast.",
    ],
  },
  {
    slug: "thueringen",
    german: "Thüringen",
    english: "Thuringia",
    capital: "Erfurt",
    capitalGerman: "Erfurt",
    land: "Forested hills in the middle of the country.",
    facts: [
      "People sometimes call it the green heart of Germany.",
      "The Wartburg and the town of Weimar are here.",
    ],
  },
];

export function getState(slug: string): StateInfo | undefined {
  return states.find((state) => state.slug === slug);
}
