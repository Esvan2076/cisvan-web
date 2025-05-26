import { BASE_API } from "../constants/api";

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
  recordClick: async (data: SearchClickData): Promise<void> => {
    console.log("Recording search click:", data);
    const response = await fetch(`${BASE_API}/search/click`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include" // Importante: incluir cookies para autenticación
    });

    if (!response.ok) {
      console.error("Error recording search click:", response.status, response.statusText);
      throw new Error("Error recording search click");
    }
    
    console.log("Search click recorded successfully");
  },

  getSuggestions: async (): Promise<SearchSuggestionsResponse> => {
    console.log("Fetching search suggestions");
    const response = await fetch(`${BASE_API}/search/suggestions`, {
      credentials: "include" // Importante: incluir cookies para autenticación
    });
    
    if (!response.ok) {
      console.error("Error fetching search suggestions:", response.status, response.statusText);
      throw new Error("Error fetching search suggestions");
    }

    const data = await response.json();
    console.log("Received search suggestions:", data);
    return data;
  },
};