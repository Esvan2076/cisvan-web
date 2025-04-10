import { useTranslation } from "react-i18next";
import { personService } from "../services/personService";
import { useSearchWithDebounce } from "./shared/useSearchWithDebounce";
import { PersonResult } from "../models/searchResult";

export const usePersonSearch = (query: string, enabled: boolean) => {
  const { t } = useTranslation();
  return useSearchWithDebounce<PersonResult>(
    query,
    enabled,
    personService.search,
    t("error_person")
  );
};
