import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalSearch } from "./search/useGlobalSearch";
import { useMovieSearch } from "./search/useMovieSearch";
import { usePersonSearch } from "./search/usePersonSearch";
import { useSerieSearch } from "./search/useSerieSearch";
import { useClickOutside } from "./shared/useClickOutside";
import { SearchResult } from "../models/searchResult";
import { isPersonResult } from "../utils/typeGuards";
import { searchService, SearchSuggestion } from "../services/searchService";
import { useAuth } from "./useAuth";

export const useSearchLogic = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [recentResults, setRecentResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);

  useClickOutside(wrapperRef, () => setIsDropdownOpen(false));

  const selectedFilter = localStorage.getItem("selectedFilter") || "all";
  const isPersonFilter = selectedFilter === "person";
  const isMovieFilter = selectedFilter === "movie";
  const isSerieFilter = selectedFilter === "serie";
  const isGlobalFilter = selectedFilter === "all";

  useEffect(() => {
    if (isGlobalFilter && user) {
      loadSuggestions();
    }
  }, [isGlobalFilter, user]);

  const loadSuggestions = async () => {
    try {
      const response = await searchService.getSuggestions();
      const transformedResults: SearchResult[] = response.suggestions.map(
        (s) => {
          if (s.resultType === "person") {
            return {
              nconst: s.resultId,
              primaryName: s.resultTitle,
              primaryProfession: "",
              principalTitle: {
                primaryTitle: "",
                startYear: 0,
                endYear: null,
              },
              wasSearched: s.wasSearched,
            };
          } else if (s.resultType === "serie") {
            return {
              tconst: s.resultId,
              primaryTitle: s.resultTitle,
              startYear: 0,
              endYear: null,
              actors: "",
              wasSearched: s.wasSearched,
            };
          } else {
            return {
              tconst: s.resultId,
              primaryTitle: s.resultTitle,
              startYear: 0,
              actors: "",
              wasSearched: s.wasSearched,
            };
          }
        }
      );
      setRecentResults(transformedResults);
      setSuggestions(response.suggestions);
    } catch (error) {
      console.error("Error loading suggestions:", error);
    }
  };

  const { results: personResults, loading: loadingPersons } = usePersonSearch(
    searchTerm,
    isPersonFilter
  );
  const { results: movieResults, loading: loadingMovies } = useMovieSearch(
    searchTerm,
    isMovieFilter
  );
  const { results: serieResults, loading: loadingSeries } = useSerieSearch(
    searchTerm,
    isSerieFilter
  );
  const { results: globalResults, loading: loadingGlobal } = useGlobalSearch(
    searchTerm,
    isGlobalFilter
  );

  const currentResults = isPersonFilter
    ? personResults
    : isMovieFilter
      ? movieResults
      : isSerieFilter
        ? serieResults
        : isGlobalFilter
          ? globalResults
          : [];

  const currentLoading = isPersonFilter
    ? loadingPersons
    : isMovieFilter
      ? loadingMovies
      : isSerieFilter
        ? loadingSeries
        : isGlobalFilter
          ? loadingGlobal
          : false;

  const recordSearchClick = async (item: SearchResult) => {
    if (!user) {
      console.log("No user logged in, skipping search recording");
      return;
    }

    const clickData = {
      searchTerm: searchTerm || "suggestion",
      resultType:
        "nconst" in item
          ? "person"
          : "endYear" in item && item.endYear !== null
            ? "serie"
            : "movie",
      resultId: "nconst" in item ? item.nconst : item.tconst,
      resultTitle: "nconst" in item ? item.primaryName : item.primaryTitle,
    };

    console.log("Preparing to record search click:", clickData);

    try {
      await searchService.recordClick(clickData);
      console.log("Search click recorded, refreshing suggestions");
      // Recargar sugerencias después de registrar una búsqueda
      await loadSuggestions();
    } catch (error) {
      console.error("Error recording search click:", error);
    }
  };

  const handleSearch = async () => {
    if (currentResults.length === 0) return;

    const first = currentResults[0];
    await recordSearchClick(first);

    if (isPersonFilter && "nconst" in first) {
      navigate(`/person/${first.nconst}`);
    } else if (
      (isMovieFilter || isSerieFilter || isGlobalFilter) &&
      "tconst" in first
    ) {
      navigate(`/content/${first.tconst}`);
    } else if (isGlobalFilter && "nconst" in first) {
      navigate(`/person/${first.nconst}`);
    }

    setSearchTerm("");
    setIsDropdownOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentResults.length > 0) {
      handleSearch();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsDropdownOpen(true);

    if (value.trim() === "" && isGlobalFilter && user) {
      loadSuggestions();
    }
  };

  // useSearchLogic.ts - Modificar la función handleSelectResult
  // Modificar handleSelectResult para asegurar que se espere por recordSearchClick
  const handleSelectResult = async (item: SearchResult) => {
    console.log("Selected search result:", item);

    try {
      await recordSearchClick(item);
      console.log("Navigating to result page");

      if ("nconst" in item) {
        navigate(`/person/${item.nconst}`);
      } else if ("tconst" in item) {
        navigate(`/content/${item.tconst}`);
      }

      setSearchTerm("");
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Error in handleSelectResult:", error);
    }
  };

  const clearRecentSearches = () => {
    setRecentResults([]);
    setSuggestions([]);
  };

  const refreshRecentSearches = () => {
    if (user) {
      loadSuggestions();
    }
  };

  return {
    wrapperRef,
    searchTerm,
    setSearchTerm,
    handleChange,
    handleKeyDown,
    handleSearch,
    isDropdownOpen,
    setIsDropdownOpen,
    selectedFilter,
    currentResults,
    currentLoading,
    recentResults,
    handleSelectResult,
    clearRecentSearches,
    refreshRecentSearches,
  };
};
