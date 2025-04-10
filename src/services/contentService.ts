import { BASE_API } from "../constants/api";
import { errorMessages } from "../constants/errors";
import { Content } from "../models/content";
import { MovieResult, SerieResult } from "../models/searchResult";
import { SearchResult } from "../models/searchResult";
import { fetchJson } from "../utils/fetchJson";

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
      streamingServices: Array.isArray(data.streamingServices) ? data.streamingServices : [],
    };
  },

  search: async (query: string): Promise<MovieResult[]> =>
    fetchJson(`${BASE_API}/title/search-movie?query=${encodeURIComponent(query)}`, errorMessages.content), 

  searchSeries: async (query: string): Promise<SerieResult[]> =>
    fetchJson(`${BASE_API}/title/search-serie?query=${encodeURIComponent(query)}`, errorMessages.content),

  searchAll: async (query: string): Promise<SearchResult[]> => {
    const rawResults = await fetchJson(
      `${BASE_API}/title/search?query=${encodeURIComponent(query)}`,
      errorMessages.content
    ) as any[];

    return rawResults.map((item: any) => {
      if (item.nconst) {
        return { ...item, type: "person" };
      } else if ("endYear" in item) {
        return { ...item, type: "serie" };
      } else {
        return { ...item, type: "movie" };
      }
    });
  }
};
