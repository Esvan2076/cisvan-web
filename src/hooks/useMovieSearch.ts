import { useTranslation } from "react-i18next";
import { contentService } from "../services/contentService";
import { MovieResult } from "../models/searchResult";
import { useSearchWithDebounce } from "./shared/useSearchWithDebounce";

export const useMovieSearch = (query: string, enabled: boolean) => {
  const { t } = useTranslation();

  return useSearchWithDebounce<MovieResult>(
    query,
    enabled,
    contentService.search,
    t("error_content")
  );
};
