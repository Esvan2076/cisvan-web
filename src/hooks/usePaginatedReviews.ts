import { useState, useEffect, useCallback } from "react";
import { PaginatedReview } from "../models/PaginatedReview";
import { reviewService } from "../services/reviewService";

export const usePaginatedReviews = (tconst: string) => {
  const token = localStorage.getItem("auth_token");
  const [reviews, setReviews] = useState<PaginatedReview | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);

  // Actualizar la página al cambiar el contenido
  useEffect(() => {
    setPage(0); // Reiniciar la página solo si el tconst cambia
  }, [tconst]);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await reviewService.getPaginatedReviews(tconst, page, token || undefined);
      setReviews(data);
    } catch (err) {
      setError("Error fetching reviews");
      console.error("Error fetching paginated reviews:", err);
      setReviews(null); // Reinicia el estado en caso de error
    } finally {
      setLoading(false);
    }
  }, [tconst, page, token]);

  // Realizar la solicitud cuando cambie el contenido o la página
  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const nextPage = () => {
    if (reviews && !reviews.last) setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (reviews && !reviews.first) setPage((prev) => prev - 1);
  };

  return {
    reviews,
    loading,
    error,
    currentPage: page,
    totalPages: reviews?.totalPages || 0,
    nextPage,
    prevPage,
    reload: fetchReviews,
  };
};
