import { useFetch } from "./shared/useFetch";
import { personService, KnownForItem, Person } from "../services/personService";
import { useTranslation } from "react-i18next";

export const usePersonDetails = (nconst?: string) => {
  const { t } = useTranslation();
  const { data, loading, error } = useFetch<Person>(
    () => personService.getById(nconst!),
    [nconst],
    !nconst
  );

  return {
    person: data ?? null,
    loading,
    error: error ? t(error) : null,
  };
};

export const useKnownFor = (nconst?: string) => {
  const { t } = useTranslation();
  const { data, loading, error } = useFetch<KnownForItem[]>(
    () => personService.getKnownFor(nconst!),
    [nconst],
    !nconst
  );

  return {
    knownFor: data ?? [],
    loading,
    error: error ? t(error) : null,
  };
};
