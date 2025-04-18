import { BASE_API } from "../constants/api";
import { errorMessages } from "../constants/errors";
import { Content, TitleSearchResult } from "../models/content";
import { MovieResult, SerieResult, SearchResult } from "../models/searchResult";
import { fetchJson } from "../utils/fetchJson";

interface TitleSearchPayload {
  name: string;
  types?: string[];
  genres?: string[];
  streamingServices?: string | null;
}

interface TitleSearchResponse {
  content: TitleSearchResult[];
  totalPages: number;
  totalElements: number;
  number: number;
}

export const contentService = {
  getById: async (contentId: string, language: string): Promise<Content> => {
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
      streamingServices: Array.isArray(data.streamingServices)
        ? data.streamingServices
        : [],
    };
  },

  searchMovie: async (query: string): Promise<MovieResult[]> =>
    fetchJson(
      `${BASE_API}/title/search-movie?query=${encodeURIComponent(query)}`,
      errorMessages.content
    ),

  searchSeries: async (query: string): Promise<SerieResult[]> =>
    fetchJson(
      `${BASE_API}/title/search-serie?query=${encodeURIComponent(query)}`,
      errorMessages.content
    ),

  searchAll: async (query: string): Promise<SearchResult[]> => {
    const rawResults = await fetchJson(
      `${BASE_API}/title/search?query=${encodeURIComponent(query)}`,
      errorMessages.content
    );

    return rawResults as SearchResult[];
  },

  advancedSearch: async (
    filters: TitleSearchPayload,
    page: number = 0
  ): Promise<TitleSearchResponse> => {
    const response = await fetch(`${BASE_API}/title/advanced-search?page=${page}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filters),
    });

    if (!response.ok) throw new Error(errorMessages.content);

    return response.json();
  },
};
