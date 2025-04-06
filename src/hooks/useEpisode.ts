import { useFetch } from "./shared/useFetch";
import { episodeService, Episode, SeriesSummary } from "../services/episodeService";
import { useTranslation } from "react-i18next";

export const useEpisodesBySeason = (seriesTconst?: string, season?: number) => {
  const { t } = useTranslation();
  const { data, loading, error } = useFetch<Episode[]>(
    () => episodeService.getBySeason(seriesTconst!, season!),
    [seriesTconst, season],
    !seriesTconst || season == null
  );

  return {
    episodes: data ?? [],
    loading,
    error: error ? t(error) : null,
  };
};

export const useSeriesSummary = (tconst?: string, enabled: boolean = true) => {
  const { t } = useTranslation();
  const { data, loading, error } = useFetch<SeriesSummary>(
    () => episodeService.getSeriesSummary(tconst!),
    [tconst],
    !tconst || !enabled
  );

  return {
    data,
    loading,
    error: error ? t(error) : null,
  };
};
