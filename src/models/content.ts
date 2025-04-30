import { StreamingService } from "./streaming";

export interface Content {
  tconst: string;
  titleType: string;
  primaryTitle: string;
  originalTitle: string;
  isAdult: boolean;
  startYear?: number | null;
  endYear?: number | null;
  runtimeMinutes: number;
  genres: string[];
  posterUrl: string;
  inUserList: boolean;
  titleRatings: {
    averageRating: number;
    numVotes: number;
  };
  directors: { nconst: string; primaryName: string }[];
  writers: { nconst: string; primaryName: string }[];
  streamingServices?: StreamingService[];
}

export interface TitleRatings {
  tconst: string;
  averageRating: number;
  numVotes: number;
}

export interface TitleSearchResult {
  tconst: string;
  titleType: string;
  primaryTitle: string;
  startYear: number;
  posterUrl: string;
  titleRatings: TitleRatings;
}

export interface TopTitle {
  tconst: string;
  primaryTitle: string;
  posterUrl: string;
  averageRating: number;
  inUserList: boolean;
}
