import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector) // Detecta idioma del navegador
  .use(initReactI18next) // Integración con React
  .init({
    resources: {
      es: {
        translation: {
          login: "Iniciar Sesión",
          history: "Historial",
          language: "Idioma",
          languages: {
            es: "Español",
            en: "Inglés"
          },
          filter: "TODO",
          search: "Buscar...",
          filters: {
            all: "TODO",
            movies: "Películas",
            actors: "Actores",
            directors: "Directores",
          },
        },
      },
      en: {
        translation: {
          login: "Login",
          history: "Watch history",
          language: "Language",
          languages: {
            es: "Spanish",
            en: "English"
          },
          filter: "ALL",
          search: "Search...",
          filters: {
            all: "ALL",
            movies: "Movies",
            actors: "Actors",
            directors: "Directors",
          },
        },
      },
    },
    fallbackLng: "es", // Idioma por defecto
    interpolation: {escapeValue: false},
  });

// Guardar idioma cuando cambie
i18n.on("languageChanged", (lng) => {
    localStorage.setItem("language", lng);
});

export default i18n;
