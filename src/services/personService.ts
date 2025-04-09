import { BASE_API } from "../constants/api";
import { errorMessages } from "../constants/errors";
import { KnownForItem, Person, PersonSearchResult } from "../models/person";
import { fetchJson } from "../utils/fetchJson";

export const personService = {
  getById: async (nconst: string): Promise<Person> =>
    fetchJson(`${BASE_API}/name/${nconst}`, errorMessages.person),

  getKnownFor: async (nconst: string): Promise<KnownForItem[]> =>
    fetchJson(`${BASE_API}/name/${nconst}/known-for`, errorMessages.knownFor),

  search: async (query: string): Promise<PersonSearchResult[]> =>
    fetchJson(`${BASE_API}/name/search?query=${encodeURIComponent(query)}`, errorMessages.person),
};
