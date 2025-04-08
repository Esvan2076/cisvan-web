// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// importas por separado
import esTranslation from "./locales/es/translation.json";
import esLegal from "./locales/es/legal.json";
import enTranslation from "./locales/en/translation.json";
import enLegal from "./locales/en/legal.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: {
        translation: esTranslation,
        legal: esLegal,
      },
      en: {
        translation: enTranslation,
        legal: enLegal,
      },
    },
    fallbackLng: "es",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
