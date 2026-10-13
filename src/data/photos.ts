import credits from "./photo-credits.json";

export type PhotoCredit = {
  id: string;
  file: string;
  title: string;
  photographer: string;
  licence: string;
  source: string;
};

const list = credits as PhotoCredit[];

const byId = new Map(list.map((item) => [item.id, item]));

export function getPhoto(id?: string): PhotoCredit | undefined {
  if (!id) return undefined;
  return byId.get(id);
}

export function cleanCredit(value: string): string {
  return value
    .replace(/&/g, "&")
    .replace(/"/g, '"')
    .replace(/&#039;|'/g, "'")
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)))
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
