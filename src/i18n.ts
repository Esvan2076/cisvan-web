import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Traducciones existentes
import esTranslation from "./locales/es/translation.json";
import esLegal from "./locales/es/legal.json";
import esProfessions from "./locales/es/professions.json";

import enTranslation from "./locales/en/translation.json";
import enLegal from "./locales/en/legal.json";
import enProfessions from "./locales/en/professions.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: {
        translation: esTranslation,
        legal: esLegal,
        professions: esProfessions,
      },
      en: {
        translation: enTranslation,
        legal: enLegal,
        professions: enProfessions,
      },
    },
    fallbackLng: "es",
    ns: ["translation", "legal", "professions"],
    defaultNS: "translation",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
