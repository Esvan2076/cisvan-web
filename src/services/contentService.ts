import { BASE_API } from "../constants/api";
import { errorMessages } from "../constants/errors";
import { Content, TitleSearchResult, TopTitle } from "../models/content";
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
  getById: async (contentId: string, language: string, token?: string): Promise<Content> => {
    const url = `${BASE_API}/title/basic/${contentId}`;

    const headers: HeadersInit = {
      "Accept-Language": language,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, { headers });

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

  getTopMovies: async (token?: string): Promise<TopTitle[]> => {
    const headers: HeadersInit = {
      "Accept-Language": "es",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${BASE_API}/title/top-movies`, {
      headers,
    });

    if (!res.ok) throw new Error(errorMessages.content);

    return await res.json();
  },

  getTopSeries: async (token?: string): Promise<TopTitle[]> => {
    const headers: HeadersInit = {
      "Accept-Language": "es",
    };
  
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  
    const res = await fetch(`${BASE_API}/title/top-series`, {
      headers,
    });
  
    if (!res.ok) throw new Error(errorMessages.content);
  
    return await res.json();
  },
  
  getTopTrending: async (token?: string): Promise<TopTitle[]> => {
    const headers: HeadersInit = {
      "Accept-Language": "es",
    };
  
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  
    const res = await fetch(`${BASE_API}/title/top-trending`, {
      headers,
    });
  
    if (!res.ok) throw new Error(errorMessages.content);
  
    return await res.json();
  },  

  getUserList: async (token?: string): Promise<TopTitle[]> => {
    if (!token) return [];
    const res = await fetch(`${BASE_API}/title/user-list`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Accept-Language": "es",
      },
    });
  
    if (!res.ok) throw new Error("error.user_list");
  
    return await res.json();
  },

  addToUserList: async (tconst: string, token: string) => {
    const res = await fetch(`${BASE_API}/user-list/${tconst}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Accept-Language": "es",
      },
    });
  
    if (!res.ok && res.status !== 409) {
      throw new Error("Error al agregar a tu lista.");
    }
  },
  
  removeFromUserList: async (tconst: string, token: string) => {
    const res = await fetch(`${BASE_API}/user-list/${tconst}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Accept-Language": "es",
      },
    });
  
    if (!res.ok && res.status !== 404) {
      throw new Error("Error al eliminar de tu lista.");
    }
  },
};
