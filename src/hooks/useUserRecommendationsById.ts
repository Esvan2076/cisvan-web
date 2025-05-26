// hooks/useUserRecommendationsById.ts
import { useEffect, useState } from "react";
import { TopTitle } from "../models/content";
import { contentService } from "../services/contentService";

export const useUserRecommendationsById = (userId: number) => {
  const [recommendations, setRecommendations] = useState<TopTitle[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const fetch = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("auth_token");
        if (!token) return;
        const res = await contentService.getRecommendationsByUserId(userId, token);
        setRecommendations(res);
      } catch (err) {
        console.error("Error loading user recommendations", err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [userId]);

  return { recommendations, loading };
};
