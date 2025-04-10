import { useEffect, useState } from "react";

export const useSearchWithDebounce = <T>(
  query: string,
  enabled: boolean,
  searchFn: (q: string) => Promise<T[]>,
  errorMessage: string
) => {
  const [results, setResults] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || !query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await searchFn(query);
        setResults(res);
      } catch {
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }, 1000); // 1s debounce

    return () => clearTimeout(timer);
  }, [query, enabled, searchFn, errorMessage]);

  return { results, loading, error };
};
