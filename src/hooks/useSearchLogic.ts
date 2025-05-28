import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useClickOutside } from "./shared/useClickOutside";
import { SearchResult, UnifiedSearchItem } from "../models/searchResult";
import { searchService } from "../services/searchService";
import { useAuth } from "./useAuth";

export const useSearchLogic = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [unifiedResults, setUnifiedResults] = useState<UnifiedSearchItem[]>([]);
  const [loadingUnified, setLoadingUnified] = useState(false);
  const [filter, setFilter] = useState(localStorage.getItem("selectedFilter") || "all");
  const token = localStorage.getItem("auth_token");

  useClickOutside(wrapperRef, () => setIsDropdownOpen(false));

  useEffect(() => {
    performUnifiedSearch(searchTerm);
  }, [searchTerm, filter]);

  const performUnifiedSearch = async (query: string) => {
    setLoadingUnified(true);
    try {
      const response = await searchService.getUnifiedSearch(query, filter, token || "");
      setUnifiedResults(response.items);
    } catch (error) {
      console.error("Error performing unified search:", error);
      setUnifiedResults([]);
    } finally {
      setLoadingUnified(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsDropdownOpen(true);
    performUnifiedSearch(value);
  };

  const refreshRecentSearches = () => {
    performUnifiedSearch("");
  };

  const currentResults = unifiedResults;
  const currentLoading = loadingUnified;

  const transformUnifiedToSearchResult = (item: UnifiedSearchItem): SearchResult => {
    if (item.type === "person") {
      return {
        nconst: item.id,
        primaryName: item.title,
        primaryProfession: "",
        principalTitle: {
          primaryTitle: "",
          startYear: 0,
          endYear: null,
        },
      };
    } else if (item.type === "serie") {
      return {
        tconst: item.id,
        primaryTitle: item.title,
        startYear: 0,
        endYear: null,
        actors: "",
      };
    } else {
      return {
        tconst: item.id,
        primaryTitle: item.title,
        startYear: 0,
        actors: "",
      };
    }
  };

  const recordSearchClick = async (item: SearchResult) => {
    if (!token) {
      console.log("No auth token available, skipping search recording");
      return;
    }

    const clickData = {
      searchTerm: searchTerm || "suggestion",
      resultType:
        "nconst" in item ? "person" : "endYear" in item && item.endYear !== null ? "serie" : "movie",
      resultId: "nconst" in item ? item.nconst : item.tconst,
      resultTitle: "nconst" in item ? item.primaryName : item.primaryTitle,
    };

    try {
      await searchService.recordClick(clickData, token);
      console.log("Search click recorded successfully");
    } catch (error) {
      console.log("Could not record search click:", error);
    }
  };

  const handleSearch = async () => {
    if (currentResults.length === 0) return;

    const first = currentResults[0];
    const searchResult = transformUnifiedToSearchResult(first);
    await recordSearchClick(searchResult);

    if (first.type === "person") {
      navigate(`/person/${first.id}`);
    } else {
      navigate(`/content/${first.id}`);
    }

    setSearchTerm("");
    setIsDropdownOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentResults.length > 0) {
      handleSearch();
    }
  };

  const handleSelectResult = async (item: UnifiedSearchItem) => {
    try {
      const searchResult = transformUnifiedToSearchResult(item);
      await recordSearchClick(searchResult);

      if (item.type === "person") {
        navigate(`/person/${item.id}`);
      } else {
        navigate(`/content/${item.id}`);
      }

      setSearchTerm("");
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Error in handleSelectResult:", error);
    }
  };

  const clearRecentSearches = () => {
    console.log("Clear recent searches called - no longer implemented in unified search");
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
    selectedFilter: filter,
    setFilter,
    currentResults,
    currentLoading,
    recentResults: [],
    handleSelectResult,
    clearRecentSearches,
    refreshRecentSearches,
  };
};
