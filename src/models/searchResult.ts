export type SearchResult = PersonResult | MovieResult | SerieResult;

export interface PersonResult {
  nconst: string;
  primaryName: string;
  primaryProfession: string;
  principalTitle: {
    primaryTitle: string;
    startYear: number;
    endYear: number | null;
  };
}

export interface MovieResult {
  tconst: string;
  primaryTitle: string;
  startYear: number;
  actors: string;
}

export interface SerieResult {
  tconst: string;
  primaryTitle: string;
  startYear: number;
  endYear: number | null;
  actors?: string;
}
