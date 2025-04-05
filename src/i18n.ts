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
          welcomeMessage: "¡Bienvenido a CISVAN!",
          welcomeDescription: "Explora y disfruta de nuestras funciones.",
          originalTitle: "Nombre Original",
          originalSeries: "Serie Original",
          genres: "Géneros",
          directors: "Directores",
          writers: "Escritores",
          minutes: "min",
          titleType: {
            movie: "Película",
            tvSeries: "Serie de TV",
            tvMiniSeries: "Miniserie",
            tvEpisode: "Episodio de TV",
            tvMovie: "Película para TV",
            short: "Corto",
            tvSpecial: "Especial de TV",
            tvShort: "Corto de TV"
          },
          rating: "Puntuación",
          your_rating: "Tu Puntuación",
          votes: "Votos",
          rate: "Puntúa",
          unrated: "Sin puntuar",
          date: "Fecha",
          loading: "Cargando...",
          error: "Error",
          no_data: "No se encontraron datos",
          not_found: "No se encontró en la BD",
          cast: "Reparto",
          next: "Siguiente",
          previous: "Anterior",
          season: "Temporada"
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
          welcomeMessage: "Welcome to CISVAN!",
          welcomeDescription: "Explore and enjoy our features.",
          originalTitle: "Original Title",
          originalSeries: "Original Series",
          genres: "Genres",
          directors: "Directors",
          writers: "Writers",
          minutes: "min",
          titleType: {
            movie: "Movie",
            tvSeries: "TV Series",
            tvMiniSeries: "Miniseries",
            tvEpisode: "TV Episode",
            tvMovie: "TV Movie",
            short: "Short",
            tvSpecial: "TV Special",
            tvShort: "TV Short"
          },
          rating: "Rating",
          your_rating: "Your Rating",
          votes: "Votes",
          rate: "Rate",
          unrated: "Unrated",
          date: "Date",
          loading: "Loading...",
          error: "Error",
          no_data: "No data found",
          not_found: "No data found",
          cast: "Cast",
          next: "Next",
          previous: "Previous",
          season: "Season"
        },
      },      
    },
    fallbackLng: "es",
    interpolation: { escapeValue: false },
  });

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("language", lng);
});

export default i18n;