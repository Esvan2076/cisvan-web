import { personService } from "../../services/personService";
import { useSearchWithDebounce } from "../shared/useSearchWithDebounce";
import { PersonResult } from "../../models/searchResult";

export const usePersonSearch = (query: string, enabled: boolean) => {
  return useSearchWithDebounce<PersonResult>(
    query,
    enabled,
    personService.search,
    "error_person"
  );
};
