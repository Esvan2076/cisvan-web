import { useEffect, useState, useCallback } from "react";

export const useFetch = <T>(
  fetchFn: () => Promise<T>,
  deps: any[] = [],
  skip = false
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    if (skip) return;
    fetchData();
  }, deps);

  return { data, loading, error, refresh: fetchData };
};
