import { useTranslation } from "react-i18next";
import { useSearchWithDebounce } from "./shared/useSearchWithDebounce";
import { contentService } from "../services/contentService";
import { SerieResult } from "../models/searchResult";

export const useSerieSearch = (query: string, enabled: boolean) => {
    const { t } = useTranslation();

    return useSearchWithDebounce<SerieResult>(
    query,
    enabled,
    contentService.searchSeries,
    t("error_content")
    );
};
