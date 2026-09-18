"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type Lang = "es" | "en";

function deviceLanguage(): Lang {
  if (typeof navigator === "undefined") return "es";
  const language = (navigator.languages && navigator.languages[0]) || navigator.language || "";
  return /^es(?:-|$)/i.test(language) ? "es" : "en";
}

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  // "es" para coincidir con el <html lang="es"> que arma el server;
  // el efecto de abajo corrige del lado del cliente si hace falta.
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    const attr = document.documentElement.getAttribute("lang");
    setLangState(attr === "en" ? "en" : deviceLanguage());
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    document.documentElement.setAttribute("lang", next);
  }, []);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang debe usarse dentro de <LangProvider>");
  return ctx;
}
