import { useState, useEffect } from "react";
import { getEpisodesBySeason, Episode } from "../services/getEpisodesBySeason";

const useEpisodesBySeason = (seriesTconst?: string, season?: number) => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!seriesTconst || season == null) return;

    const fetchEpisodes = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getEpisodesBySeason(seriesTconst, season);
        setEpisodes(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [seriesTconst, season]);

  return { episodes, loading, error };
};

export default useEpisodesBySeason;
