import { BASE_API } from "../constants/api";
import { errorMessages } from "../constants/errors";
import { fetchJson } from "../utils/fetchJson";
import { Episode, SeriesSummary } from "../models/episode";

export const episodeService = {
  getBySeason: (seriesTconst: string, season: number): Promise<Episode[]> =>
    fetchJson(
      `${BASE_API}/episode/series/${seriesTconst}/season/${season}`,
      errorMessages.episodes
    ),

  getSeriesSummary: (tconst: string): Promise<SeriesSummary> =>
    fetchJson(
      `${BASE_API}/episode/series/summary/${tconst}`,
      errorMessages.series
    ),
};
