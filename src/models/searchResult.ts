export interface PersonResult {
  nconst: string;
  primaryName: string;
  primaryProfession: string;
  principalTitle: {
    primaryTitle: string;
    startYear: number;
    endYear: number | null;
  };
  wasSearched?: boolean;
}

export interface MovieResult {
  tconst: string;
  primaryTitle: string;
  startYear: number;
  actors: string;
  wasSearched?: boolean;
}

export interface SerieResult {
  tconst: string;
  primaryTitle: string;
  startYear: number;
  endYear: number | null;
  actors?: string;
  wasSearched?: boolean;
}

export type SearchResult = PersonResult | MovieResult | SerieResult;