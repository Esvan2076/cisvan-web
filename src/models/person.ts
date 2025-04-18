export interface Person {
  nconst: string;
  primaryName: string;
  birthYear?: number;
  deathYear?: number;
  primaryProfession: string[];
  knownForTitles: string[];
  imageUrl?: string;
  nameRatings?: {
    nconst: string;
    averageRating: number;
    numVotes: number;
  };
}

export interface KnownForItem {
  tconst: string;
  titleType: string;
  primaryTitle: string;
  startYear: number;
  posterUrl: string;
  titleRatings: {
    tconst: string;
    averageRating: number;
    numVotes: number;
  };
}

export interface PersonSearchResult {
  nconst: string;
  primaryName: string;
  birthYear?: number;
  deathYear?: number;
  professions?: string[];
  posterUrl?: string;
}
