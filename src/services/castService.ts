import { BASE_API } from "../constants/api";
import { errorMessages } from "../constants/errors";
import { fetchJson } from "../utils/fetchJson";
import { CastMember } from "../models/cast";

export const getCastByContentId = async (contentId: string): Promise<CastMember[]> =>
  fetchJson(`${BASE_API}/principal/${contentId}/cast`, errorMessages.cast);
