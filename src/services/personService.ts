import { BASE_API } from "../constants/api";
import { errorMessages } from "../constants/errors";
import { fetchJson } from "../utils/fetchJson";

export interface Person {
  nconst: string;
  primaryName: string;
  birthYear?: number;
  deathYear?: number;
  primaryProfession: string[];
  knownForTitles: string[];
  imageUrl?: string;
}

export interface KnownForItem {
  tconst: string;
  titleType: string;
  primaryTitle: string;
  startYear: number;
  posterUrl: string;
  ratings: {
    tconst: string;
    averageRating: number;
    numVotes: number;
  };
}

export const personService = {
  getById: async (nconst: string): Promise<Person> =>
    fetchJson(`${BASE_API}/name/${nconst}`, errorMessages.person),

  getKnownFor: async (nconst: string): Promise<KnownForItem[]> =>
    fetchJson(`${BASE_API}/name/${nconst}/known-for`, errorMessages.knownFor),
};
