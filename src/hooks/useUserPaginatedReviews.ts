import { useState, useEffect, useCallback } from "react";
import { PaginatedReview } from "../models/PaginatedReview";
import { BASE_API } from "../constants/api";

export const useUserPaginatedReviews = (userId: number) => {
  const token = localStorage.getItem("auth_token");
  const [reviews, setReviews] = useState<PaginatedReview | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${BASE_API}/reviews/user/paginated?userId=${userId}&page=${page}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      if (!res.ok) throw new Error("Failed to fetch user reviews");
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error(err);
      setReviews(null);
    } finally {
      setLoading(false);
    }
  }, [userId, page, token]);

  useEffect(() => {
    setPage(0);
  }, [userId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return {
    reviews,
    loading,
    currentPage: page,
    totalPages: reviews?.totalPages ?? 0,
    nextPage: () => {
      if (reviews && !reviews.last) setPage((prev) => prev + 1);
    },
    prevPage: () => {
      if (reviews && !reviews.first) setPage((prev) => prev - 1);
    },
  };
};
