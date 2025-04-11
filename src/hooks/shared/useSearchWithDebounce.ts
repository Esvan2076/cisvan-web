import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const useSearchWithDebounce = <T>(
  query: string,
  enabled: boolean,
  searchFn: (q: string) => Promise<T[]>,
  translationKey: string
) => {
  const { t } = useTranslation()

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
        setError(t(translationKey));
      } finally {
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [query, enabled, searchFn, t, translationKey]);

  return { results, loading, error };
};
