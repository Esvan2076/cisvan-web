import { useEffect, useState } from "react";
import { personService } from "../services/personService";
import { useTranslation } from "react-i18next";
import { PersonSearchResult } from "../models/person";

export const usePersonSearch = (query: string, enabled: boolean) => {
  const { t } = useTranslation();
  const [results, setResults] = useState<PersonSearchResult[]>([]);
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
        const res = await personService.search(query);
        setResults(res);
      } catch (err) {
        setError(t("error_person"));
      } finally {
        setLoading(false);
      }
    }, 1000); // debounce de 1 segundo

    return () => clearTimeout(timer);
  }, [query, enabled, t]);

  return { results, loading, error };
};