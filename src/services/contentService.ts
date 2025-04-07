import { BASE_API } from "../constants/api";
import { errorMessages } from "../constants/errors";

export interface StreamingService {
  id: number;
  name: string;
  color: string;
  url: string;
}

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
  ratings: {
    averageRating: number;
    numVotes: number;
  };
  directors: { nconst: string; primaryName: string }[];
  writers: { nconst: string; primaryName: string }[];
  streamingServices?: StreamingService[];
}

export const getContentById = async (
  contentId: string,
  language: string
): Promise<Content> => {
  const url = `${BASE_API}/title/basic/${contentId}`;

  const response = await fetch(url, {
    headers: {
      "Accept-Language": language,
    },
  });

  if (!response.ok) throw new Error(errorMessages.content);

  const data = await response.json();

  return {
    ...data,
    streamingServices: Array.isArray(data.streamingServices) ? data.streamingServices : [],
  };
};
