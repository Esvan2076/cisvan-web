import { useTranslation } from "react-i18next";
import SearchResultItem from "../../molecules/search/PersonResultItem";
import MovieResultItem from "../../molecules/search/MovieResultItem";
import SerieResultItem from "../../molecules/search/SerieResultItem";
import { SearchResult } from "../../../models/searchResult";

interface Props {
  results: SearchResult[];
  loading: boolean;
  onSelect?: () => void;
}

const SearchResultDropdown: React.FC<Props> = ({
  results,
  loading,
  onSelect,
}) => {
  const { t } = useTranslation();

  return (
    <div className="absolute z-10 w-full bg-neutral-800 border-2 border-t-0 border-white rounded-b-lg shadow-md text-sm text-gray-300 max-h-72 overflow-y-auto">
      {loading ? (
        <div className="px-4 py-2 text-gray-400 italic">{t("loading")}</div>
      ) : results.length === 0 ? (
        <div className="px-4 py-2 text-gray-400 italic">{t("no_data")}</div>
      ) : (
        results.map((result, index) => {
          if ("nconst" in result) {
            return (
              <SearchResultItem
                key={result.nconst}
                result={result}
                onSelect={onSelect}
              />
            );
          } else if ("endYear" in result) {
            return (
              <SerieResultItem
                key={result.primaryTitle + index}
                result={result}
                onSelect={onSelect}
              />
            );
          } else {
            return (
              <MovieResultItem
                key={result.primaryTitle + index}
                result={result}
                onSelect={onSelect}
              />
            );
          }
        })
      )}
    </div>
  );
};

export default SearchResultDropdown;
