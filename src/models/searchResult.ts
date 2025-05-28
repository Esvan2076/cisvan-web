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

// Agregar al final del archivo
export interface UnifiedSearchItem {
  id: string;
  type: "movie" | "serie" | "person";
  title: string;
  subtitle: string;
  recent: boolean; // en lugar de isRecent
  popular: boolean; // en lugar de isPopular
  priority: number;
}

export interface UnifiedSearchResponse {
  items: UnifiedSearchItem[];
  hasQuery: boolean;
}