import { useEffect, useState } from "react";
import { TopTitle } from "../models/content";
import { contentService } from "../services/contentService";

export const useUserRecommendations = () => {
  const [recommendations, setRecommendations] = useState<TopTitle[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await contentService.getRecommendations(token);
        setRecommendations(data);
      } catch (err) {
        console.error("Error loading recommendations", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { recommendations, loading };
};
