import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalSearch } from "./search/useGlobalSearch";
import { useMovieSearch } from "./search/useMovieSearch";
import { usePersonSearch } from "./search/usePersonSearch";
import { useSerieSearch } from "./search/useSerieSearch";
import { useClickOutside } from "./shared/useClickOutside";
import { SearchResult } from "../models/searchResult";
import { isPersonResult } from "../utils/typeGuards";

const RECENT_SEARCH_KEY = "recent_searches";


const getRecentSearches = (): SearchResult[] => {
  const saved = localStorage.getItem(RECENT_SEARCH_KEY);
  return saved ? JSON.parse(saved) : [];
};

const saveRecentSearch = (item: SearchResult) => {
  const existing = getRecentSearches();
  const filtered = existing.filter((r) => {
    if (isPersonResult(r) && isPersonResult(item)) {
      return r.nconst !== item.nconst;
    }

    if (!isPersonResult(r) && !isPersonResult(item)) {
      return r.primaryTitle !== item.primaryTitle;
    }

    return true;
  });

  const updated = [item, ...filtered].slice(0, 5);
  localStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(updated));
};


export const useSearchLogic = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [recentResults, setRecentResults] = useState<SearchResult[]>([]);

  useClickOutside(wrapperRef, () => setIsDropdownOpen(false));

  const selectedFilter = localStorage.getItem("selectedFilter") || "all";
  const isPersonFilter = selectedFilter === "person";
  const isMovieFilter = selectedFilter === "movie";
  const isSerieFilter = selectedFilter === "serie";
  const isGlobalFilter = selectedFilter === "all"; // 👈 aquí la declaración correcta

  // 👇 Ahora sí, después de declarar isGlobalFilter
  useEffect(() => {
    if (isGlobalFilter) {
      const saved = getRecentSearches();
      setRecentResults(saved);
    }
  }, [isGlobalFilter]);

  const { results: personResults, loading: loadingPersons } = usePersonSearch(searchTerm, isPersonFilter);
  const { results: movieResults, loading: loadingMovies } = useMovieSearch(searchTerm, isMovieFilter);
  const { results: serieResults, loading: loadingSeries } = useSerieSearch(searchTerm, isSerieFilter);
  const { results: globalResults, loading: loadingGlobal } = useGlobalSearch(searchTerm, isGlobalFilter);

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

  const handleSearch = () => {
    if (currentResults.length === 0) return;

    const first = currentResults[0];

    if (isPersonFilter && "nconst" in first) {
      navigate(`/person/${first.nconst}`);
    } else if ((isMovieFilter || isSerieFilter) && "primaryTitle" in first) {
      navigate(`/content/${first.primaryTitle}`);
    } else if (isGlobalFilter) {
      navigate("nconst" in first ? `/person/${first.nconst}` : `/content/${first.primaryTitle}`);
    }

    if (isGlobalFilter) saveRecentSearch(first);

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

    if (value.trim() === "" && isGlobalFilter) {
      const saved = getRecentSearches();
      setRecentResults(saved);
    }
  };

  const handleSelectResult = (item: SearchResult) => {
    if (isGlobalFilter) saveRecentSearch(item);

    if ("nconst" in item) {
      navigate(`/person/${item.nconst}`);
    } else {
      navigate(`/content/${item.primaryTitle}`);
    }

    setSearchTerm("");
    setIsDropdownOpen(false);
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
  };
};
