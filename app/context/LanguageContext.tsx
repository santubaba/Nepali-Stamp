"use client";

import { createContext, useState } from "react";
import { en } from "@/app/translations/en";
import { np } from "@/app/translations/np";
type LanguageContextType = {
  language: "EN" | "NP";
  setLanguage: React.Dispatch<React.SetStateAction<"EN" | "NP">>;
  text: typeof en;
};

export const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<"EN" | "NP">("EN");
  const text = language ==="EN" ? en:np
  return ( 
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        text,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
