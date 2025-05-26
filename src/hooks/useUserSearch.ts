import { useState } from "react";
import { userService } from "../services/userService";
import { UserSearchResult } from "../models/user";

export const useUserSearch = () => {
  const [results, setResults] = useState<UserSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const search = async (username: string, page: number = 0) => {
    try {
      setLoading(true);
      const response = await userService.search(username, page);
      setResults(response.content);
      setTotalPages(response.totalPages);
      setTotal(response.totalElements);
      setCurrentPage(page);
      setError(null);
    } catch (err) {
      setError("error.fetch_users");
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
