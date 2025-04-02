import { useEffect, useState } from "react";
import { getSeriesSummary, SeriesSummary } from "../services/getSeriesSummary";

const useSeriesSummary = (tconst?: string, enabled: boolean = true) => {
  const [data, setData] = useState<SeriesSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tconst || !enabled) return;

    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getSeriesSummary(tconst);
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [tconst, enabled]);

  return { data, loading, error };
};

export default useSeriesSummary;
