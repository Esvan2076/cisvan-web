// hooks/useReview.ts
import { useState, useEffect } from "react";
import { reviewService } from "../services/reviewService";
import { ReviewData } from "../models/ReviewData";

export const useReview = (tconst?: string, open?: boolean) => {
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("auth_token") || "";

  // Función para enviar la reseña
  const submitReview = async (reviewJson: any) => {
    setLoading(true);
    setError(null);
    try {
      await reviewService.submitReview(reviewJson, token);
    } catch (err) {
      setError("Error al enviar la reseña");
    } finally {
      setLoading(false);
    }
  };

  // Efecto para cargar los datos de la reseña
  useEffect(() => {
    if (!open || !tconst) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await reviewService.getReviewData(tconst);
        setReviewData(data);
      } catch (err) {
        setError("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tconst, open]);

  return { reviewData, submitReview, loading, error };
};
