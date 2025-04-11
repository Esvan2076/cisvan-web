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
