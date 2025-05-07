
import { recommendationService } from "../services/recommendationService";
import { Recommendation } from "../models/Recommendation";
import { useFetch } from "./shared/useFetch";

export const useRecommendations = (contentId?: string) => {
  return useFetch<Recommendation[]>(
    () => recommendationService.getByContentId(contentId!),
    [contentId],
    !contentId
  );
};
