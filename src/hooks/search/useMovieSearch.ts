import { contentService } from "../../services/contentService";
import { MovieResult } from "../../models/searchResult";
import { useSearchWithDebounce } from "../shared/useSearchWithDebounce";

export const useMovieSearch = (query: string, enabled: boolean) => {
  return useSearchWithDebounce<MovieResult>(
    query,
    enabled,
    contentService.searchMovie,
    "error_content"
  );
};
