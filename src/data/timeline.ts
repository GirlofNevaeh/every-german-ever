import type { TimelineEvent } from "./types";

export const timeline: TimelineEvent[] = [
  {
    id: "farmers",
    year: "Long ago",
    title: "First farmers",
    text: "The first farmers cleared fields, kept animals, and lived in small villages.",
  },
  {
    id: "romans",
    year: "About 2,000 years ago",
    title: "Roman towns on the Rhine",
    text: "Romans built towns along the Rhine, including places at today's Trier, Köln, and Mainz.",
  },
  {
    id: "aachen",
    year: "About 800",
    title: "Charlemagne at Aachen",
    text: "Charlemagne was a Frankish king of many lands, not a modern German. He held court at Aachen.",
  },
  {
    id: "gutenberg",
    year: "About 1450",
    title: "Gutenberg's press",
    text: "In Mainz, Johannes Gutenberg printed with movable metal type. Movable type was already used in China and Korea.",
  },
  {
    id: "luther",
    year: "1517",
    title: "Luther",
    text: "Martin Luther wanted to reform the church. Arguments in his time split churches.",
  },
  {
    id: "war-1600s",
    year: "1618 to 1648",
    title: "A long war",
    text: "A long war crossed these lands. Towns and families were hurt.",
  },
  {
    id: "kindergarten",
    year: "1840",
    title: "The kindergarten",
    text: "Friedrich Fröbel opened a kindergarten, a children's garden, in Bad Blankenburg.",
  },
  {
    id: "empire",
    year: "1871",
    title: "Many states, one empire",
    text: "In 1871 many states became one empire.",
  },
  {
    id: "car",
    year: "1886",
    title: "A car in Mannheim",
    text: "Karl Benz built a car in Mannheim. Bertha Benz drove it a long way and showed that it worked.",
  },
  {
    id: "war-1914",
    year: "1914 to 1918",
    title: "A wide war",
    text: "From 1914 to 1918 there was a war, and many families waited for people to come home.",
  },
  {
    id: "1933",
    year: "1933",
    title: "A cruel government",
    text: "From 1933 a cruel government hurt Jewish people and many others, and that was wrong.",
  },
  {
    id: "1945",
    year: "1945",
    title: "The war was over",
    text: "In 1945 the war was over, and the country was split.",
  },
  {
    id: "1949",
    year: "1949",
    title: "Two governments",
    text: "From 1949 there were two governments, one in the west and one in the east. The Basic Law began in the west.",
  },
  {
    id: "1961",
    year: "1961",
    title: "A wall in Berlin",
    text: "In 1961 a wall in Berlin meant families could not cross freely.",
  },
  {
    id: "1989",
    year: "1989",
    title: "The wall opened",
    text: "In 1989 the wall opened.",
  },
  {
    id: "1990",
    year: "1990",
    title: "One country again",
    text: "In 1990 the country was one again.",
  },
  {
    id: "today",
    year: "Today",
    title: "Berlin and the Basic Law",
    text: "The Basic Law protects people's rights. Parliament, the Bundestag, meets in Berlin. Germany has 16 states.",
  },
];

export const CRUEL_YEARS_TEXT = timeline.find((event) => event.id === "1933")!.text;
