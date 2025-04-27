import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Traducciones existentes
import esTranslation from "./locales/es/translation.json";
import esLegal from "./locales/es/legal.json";
import esProfessions from "./locales/es/professions.json";
import esGenres from "./locales/es/genres.json";
import esTypes from "./locales/es/types.json";
import esAuth from "./locales/es/auth.json";
import esProfile from "./locales/es/profile.json"; // 👈 nuevo

import enTranslation from "./locales/en/translation.json";
import enLegal from "./locales/en/legal.json";
import enProfessions from "./locales/en/professions.json";
import enGenres from "./locales/en/genres.json";
import enTypes from "./locales/en/types.json";
import enAuth from "./locales/en/auth.json";
import enProfile from "./locales/en/profile.json"; // 👈 nuevo

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: {
        translation: esTranslation,
        legal: esLegal,
        professions: esProfessions,
        genres: esGenres,
        types: esTypes,
        auth: esAuth,
        profile: esProfile, // 👈 agregado
      },
      en: {
        translation: enTranslation,
        legal: enLegal,
        professions: enProfessions,
        genres: enGenres,
        types: enTypes,
        auth: enAuth,
        profile: enProfile, // 👈 agregado
      },
    },
    fallbackLng: "es",
    ns: ["translation", "legal", "professions", "genres", "types", "auth", "profile"], // 👈 agregado "profile"
    defaultNS: "translation",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
