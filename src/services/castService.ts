import { BASE_API } from "../constants/api";
import { errorMessages } from "../constants/errors";
import { fetchJson } from "../utils/fetchJson";

export interface CastMember {
  nconst: string;
  primaryName: string;
  characters: string;
  imageUrl: string;
}

export const getCastByContentId = async (contentId: string): Promise<CastMember[]> =>
  fetchJson(`${BASE_API}/principal/${contentId}/cast`, errorMessages.cast);
