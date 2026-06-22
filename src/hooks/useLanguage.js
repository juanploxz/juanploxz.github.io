import { useContext } from "react";
import { LanguageContext } from "../lib/i18n-context";

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
