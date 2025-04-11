import { useSearchWithDebounce } from "../shared/useSearchWithDebounce";
import { contentService } from "../../services/contentService";
import { SerieResult } from "../../models/searchResult";

export const useSerieSearch = (query: string, enabled: boolean) => {
  return useSearchWithDebounce<SerieResult>(
    query,
    enabled,
    contentService.searchSeries,
    "error_content"
  );
};
