import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { TopTitle } from "../models/content";
import { contentService } from "../services/contentService";

export const useTopContent = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [movies, setMovies] = useState<TopTitle[]>([]);
  const [series, setSeries] = useState<TopTitle[]>([]);
  const [trending, setTrending] = useState<TopTitle[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("auth_token") || "";

        const [movieData, seriesData, trendingData] = await Promise.all([
          contentService.getTopMovies(token),
          contentService.getTopSeries(token),
          contentService.getTopTrending(token),
        ]);

        setMovies(movieData);
        setSeries(seriesData);
        setTrending(trendingData);
      } catch {
        setError(t("error_loading_content"));
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return {
    loading,
    error,
    movies,
    series,
    trending,
  };
};
