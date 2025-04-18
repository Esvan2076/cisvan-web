import { MovieResult, PersonResult, SerieResult } from "../models/searchResult";

export const isPersonResult = (item: any): item is PersonResult =>
    "nconst" in item;
  
  export const isMovieResult = (item: any): item is MovieResult =>
    "tconst" in item && "actors" in item;
  
  export const isSerieResult = (item: any): item is SerieResult =>
    "tconst" in item && "endYear" in item;
  