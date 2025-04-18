import { useState } from "react";
import { PersonSearchResult } from "../models/person";
import { personService } from "../services/personService";

export interface PersonSearchFilters {
  name?: string;
  professions?: string[];
}

export const usePersonSearch = () => {
  const [results, setResults] = useState<PersonSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const search = async (filters: PersonSearchFilters, page = 0) => {
    try {
      setLoading(true);
      const res = await personService.advancedSearch(filters, page);
      setResults(res.content);
      setTotal(res.totalElements);
      setTotalPages(res.totalPages);
      setCurrentPage(page);
      setError(null);
    } catch {
      setError("error.fetch_content");
    } finally {
      setLoading(false);
    }
  };

  return {
    results,
    loading,
    error,
    total,
    totalPages,
    currentPage,
    search,
  };
};
