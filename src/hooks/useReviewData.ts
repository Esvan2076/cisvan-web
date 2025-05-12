// hooks/useReviewData.ts
import { useState, useEffect } from "react";
import { reviewService } from "../services/reviewService";
import { ReviewData } from "../models/ReviewData";

export const useReviewData = (tconst: string, open: boolean) => {
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;

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

  return { reviewData, loading, error };
};
