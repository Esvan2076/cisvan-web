import { useState } from "react";
import { contentService } from "../services/contentService";
import { TitleSearchResult } from "../models/content";

export interface TitleSearchFilters {
  name?: string;
  types?: string[];
  genres?: string[];
  streamingServices?: string;
}

export const useTitleSearch = () => {
  const [results, setResults] = useState<TitleSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const search = async (filters: TitleSearchFilters, page: number = 0) => {
    try {
      setLoading(true);
      const response = await contentService.advancedSearch(
        { ...filters, name: filters.name || "" },
        page
      );
      setResults(response.content);
      setTotalPages(response.totalPages);
      setTotal(response.totalElements);
      setCurrentPage(page);
      setError(null);
    } catch (err) {
      setError("error.fetch_content");
    } finally {
      setLoading(false);
    }
  };

  return {
    results,
    loading,
    error,
    totalPages,
    total,
    currentPage,
    search,
  };
};