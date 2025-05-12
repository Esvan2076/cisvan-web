import { BASE_API } from "../constants/api";
import { errorMessages } from "../constants/errors";
import { KnownForItem, Person } from "../models/person";
import { PersonResult } from "../models/searchResult";

interface PersonSearchPayload {
  name?: string;
  professions?: string[];
}
interface PersonSearchResponse {
  content: PersonResult[];
  totalPages: number;
  totalElements: number;
  number: number;
}

export const personService = {
  getById: async (nconst: string): Promise<Person> => {
    const response = await fetch(`${BASE_API}/name/basic/${nconst}`);
    if (!response.ok) throw new Error(errorMessages.person);
    return response.json();
  },

  getKnownFor: async (nconst: string): Promise<KnownForItem[]> => {
    const response = await fetch(`${BASE_API}/name/${nconst}/known-for`);
    if (!response.ok) throw new Error(errorMessages.knownFor);
    return response.json();
  },

  search: async (query: string): Promise<PersonResult[]> => {
    const response = await fetch(`${BASE_API}/name/search?query=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error(errorMessages.person);
    return response.json();
  },

  advancedSearch: async (
    payload: PersonSearchPayload,
    page: number = 0
  ): Promise<PersonSearchResponse> => {
    const response = await fetch(`${BASE_API}/name/advanced-search?page=${page}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error(errorMessages.person);

    return response.json();
  },

  getWorks: async (nconst: string, page: number = 1) => {
    const response = await fetch(
      `${BASE_API}/name/${nconst}/works?page=${page-1}`
    );
    if (!response.ok) throw new Error("Failed to fetch works");
    return response.json();
  },
};
