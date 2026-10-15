import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "en" | "en-US";

const KEY = "ege-lang";

const AMERICAN: Array<[RegExp, string]> = [
  [/Colours/g, "Colors"],
  [/colours/g, "colors"],
  [/Colour/g, "Color"],
  [/colour/g, "color"],
  [/Organised/g, "Organized"],
  [/organised/g, "organized"],
  [/Organising/g, "Organizing"],
  [/organising/g, "organizing"],
  [/Travelled/g, "Traveled"],
  [/travelled/g, "traveled"],
  [/Travelling/g, "Traveling"],
  [/travelling/g, "traveling"],
  [/Centre/g, "Center"],
  [/centre/g, "center"],
  [/Theatre/g, "Theater"],
  [/theatre/g, "theater"],
  [/Licences/g, "Licenses"],
  [/licences/g, "licenses"],
  [/Licence/g, "License"],
  [/licence/g, "license"],
];

export function americanize(value: string): string {
  return AMERICAN.reduce((text, [pattern, next]) => text.replace(pattern, next), value);
}

type LanguageValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  text: (value: string) => string;
};

const LanguageContext = createContext<LanguageValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved === "en" || saved === "en-US") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "en-US" ? "en-US" : "en";
  }, [lang]);

  const value = useMemo<LanguageValue>(
    () => ({
      lang,
      setLang: (next) => {
        setLangState(next);
        localStorage.setItem(KEY, next);
      },
      text: (input) => (lang === "en-US" ? americanize(input) : input),
    }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageValue {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage requires LanguageProvider");
  return value;
}
