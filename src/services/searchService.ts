// searchService.ts
import { BASE_API } from "../constants/api";
import { UnifiedSearchResponse } from "../models/searchResult";

export interface SearchClickData {
  searchTerm: string;
  resultType: string;
  resultId: string;
  resultTitle: string;
}

export interface SearchSuggestion {
  resultId: string;
  resultType: string;
  resultTitle: string;
  wasSearched: boolean;
}

export interface SearchSuggestionsResponse {
  suggestions: SearchSuggestion[];
  suggestionsType: "user_history" | "trending";
}

export const searchService = {
  getSuggestions: async (token: string): Promise<SearchSuggestionsResponse> => {
    console.log("Fetching search suggestions");
    const response = await fetch(`${BASE_API}/search/suggestions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error(
        "Error fetching suggestions:",
        response.status,
        response.statusText
      );
      throw new Error("Error fetching search suggestions");
    }

    const data = await response.json();
    console.log("Received search suggestions:", data);
    return data;
  },

  // Modificar getUnifiedSearch para manejar token opcional
  getUnifiedSearch: async (
    query: string,
    filter: string,
    token?: string
  ): Promise<UnifiedSearchResponse> => {
    console.log(
      `Fetching unified search results for query: "${query}" with filter: "${filter}"`
    );

    const headers: HeadersInit = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(
      `${BASE_API}/title/search/unified?query=${encodeURIComponent(query)}&filter=${filter}`,
      {
        headers,
      }
    );

    if (!response.ok) {
      console.error(
        "Error fetching unified search:",
        response.status,
        response.statusText
      );
      throw new Error("Error fetching unified search results");
    }

    const data = await response.json();
    console.log("Received unified search results:", data);
    return data;
  },

  // Modificar recordClick para manejar token opcional
  recordClick: async (data: SearchClickData, token?: string): Promise<void> => {
    if (!token) {
      console.log("No token provided, skipping search click recording");
      return;
    }

    console.log("Recording search click:", data);
    const response = await fetch(`${BASE_API}/search/click`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.log("Could not record search click:", response.status);
      // No lanzar error, solo loguear
    } else {
      console.log("Search click recorded successfully");
    }
  },
};
