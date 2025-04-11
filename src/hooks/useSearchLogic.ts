import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalSearch } from "./search/useGlobalSearch";
import { useMovieSearch } from "./search/useMovieSearch";
import { usePersonSearch } from "./search/usePersonSearch";
import { useSerieSearch } from "./search/useSerieSearch";
import { useClickOutside } from "./shared/useClickOutside";

export const useSearchLogic = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside(wrapperRef, () => setIsDropdownOpen(false));

  const selectedFilter = localStorage.getItem("selectedFilter") || "all";
  const isPersonFilter = selectedFilter === "person";
  const isMovieFilter = selectedFilter === "movie";
  const isSerieFilter = selectedFilter === "serie";
  const isGlobalFilter = selectedFilter === "all";

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

  const handleSearch = () => {
    if (currentResults.length === 0) return;

    if (isPersonFilter && personResults.length > 0) {
      navigate(`/person/${personResults[0].nconst}`);
    } else if (isMovieFilter && movieResults.length > 0) {
      navigate(`/content/${movieResults[0].primaryTitle}`);
    } else if (isSerieFilter && serieResults.length > 0) {
      navigate(`/content/${serieResults[0].primaryTitle}`);
    } else if (isGlobalFilter && globalResults.length > 0) {
      const first = globalResults[0];
      if ("nconst" in first) {
        navigate(`/person/${first.nconst}`);
      } else {
        navigate(`/content/${first.primaryTitle}`);
      }
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
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true);
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
  };
};
