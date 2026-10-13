export type Role =
  | "maker"
  | "musician"
  | "writer"
  | "scientist"
  | "thinker"
  | "leader"
  | "artist"
  | "sport";

export type Period = "before-1500" | "1500-1800" | "1800-1918" | "1918-1949" | "since-1949";

export type Invention = {
  name: string;
  shared?: string;
};

export type Person = {
  slug: string;
  name: string;
  germanName: string;
  also?: string[];
  years: string;
  sortYear: number;
  knownFor: string;
  bio: string[];
  places: string[];
  roles: Role[];
  period: Period;
  inventions?: Invention[];
  photoId?: string;
};

export type Place = {
  slug: string;
  name: string;
  germanName: string;
  also?: string[];
  region: string;
  lat: number;
  lon: number;
  lines: string[];
  photoId: string;
  photoAlt: string;
};

export type StateInfo = {
  slug: string;
  german: string;
  english: string;
  capital: string;
  capitalGerman: string;
  land: string;
  facts: [string, string];
};

export type TimelineEvent = {
  id: string;
  year: string;
  title: string;
  text: string;
};

export type Question = {
  id: string;
  prompt: string;
  choices: [string, string, string, string];
  answer: 0 | 1 | 2 | 3;
};

export type ProjectCard = {
  id: string;
  stage: string;
  stageOrder: number;
  kind: "individual" | "team";
  title: string;
  need: string;
  steps: string[];
  done: string;
  note?: string;
};

export const ROLE_LABEL: Record<Role, string> = {
  maker: "Makers",
  musician: "Music",
  writer: "Writers",
  scientist: "Scientists",
  thinker: "Thinkers",
  leader: "Leaders",
  artist: "Artists",
  sport: "Sport",
};

export const PERIOD_LABEL: Record<Period, string> = {
  "before-1500": "Before 1500",
  "1500-1800": "1500 to 1800",
  "1800-1918": "1800 to 1918",
  "1918-1949": "1918 to 1949",
  "since-1949": "Since 1949",
};

export const ROLES = Object.keys(ROLE_LABEL) as Role[];
export const PERIODS = Object.keys(PERIOD_LABEL) as Period[];
