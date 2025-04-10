import { SearchResult } from "../models/searchResult";
import { contentService } from "../services/contentService";
import { useSearchWithDebounce } from "./shared/useSearchWithDebounce";

export const useGlobalSearch = (query: string, enabled: boolean) => {
    return useSearchWithDebounce<SearchResult>(
        query, // string
        enabled, // boolean
        contentService.searchAll, // search function
        "error_content" // translation key
    );
};
