import { BASE_API } from "../constants/api";
import { errorMessages } from "../constants/errors";
import { fetchJson } from "../utils/fetchJson";

export interface Episode {
  episodeNumber: number;
  tconst: string;
  primaryTitle: string;
  averageRating: number;
  numVotes: number;
}

export interface SeriesSummary {
  seriesTconst: string;
  seriesTitle: string;
  totalSeasons: number;
}

export const episodeService = {
  getBySeason: (seriesTconst: string, season: number): Promise<Episode[]> =>
    fetchJson(`${BASE_API}/episode/series/${seriesTconst}/season/${season}`, errorMessages.episodes),

  getSeriesSummary: (tconst: string): Promise<SeriesSummary> =>
    fetchJson(`${BASE_API}/episode/series/summary/${tconst}`, errorMessages.series)
};
