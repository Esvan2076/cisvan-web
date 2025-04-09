import { useTranslation } from "react-i18next";
import SearchResultItem from "../molecules/SearchResultItem";
import { PersonSearchResult } from "../../models/person";

interface Props {
  results: PersonSearchResult[];
  loading: boolean;
  onSelect?: () => void; // se invoca cuando se selecciona un ítem
}

const SearchResultDropdown: React.FC<Props> = ({ results, loading, onSelect }) => {
  const { t } = useTranslation();

  return (
    <div className="absolute z-10 bg-neutral-800 border-2 border-white border-t-0 w-full rounded-b-lg max-h-60 overflow-y-auto shadow-lg">
      {loading ? (
        <p className="text-gray-400 text-sm px-4 py-2">{t("loading")}</p>
      ) : results.length === 0 ? (
        <p className="text-gray-400 text-sm px-4 py-2">{t("no_data")}</p>
      ) : (
        results.map((result) => (
          <SearchResultItem key={result.nconst} result={result} onSelect={onSelect} />
        ))
      )}
    </div>
  );
};

export default SearchResultDropdown;
