import { useTranslation } from "react-i18next";
import PersonResultItem from "../../molecules/search/PersonResultItem";
import MovieResultItem from "../../molecules/search/MovieResultItem";
import SerieResultItem from "../../molecules/search/SerieResultItem";
import { SearchResult } from "../../../models/searchResult";

interface Props {
  results: SearchResult[];
  loading: boolean;
  onSelect?: (item: SearchResult) => void;
  recentResults?: SearchResult[];
}

const SearchResultDropdown: React.FC<Props> = ({
  results,
  loading,
  onSelect,
  recentResults = [],
}) => {
  const { t } = useTranslation();

  const isRecent = (item: SearchResult) =>
    recentResults.some((r) =>
      "nconst" in r && "nconst" in item
        ? r.nconst === item.nconst
        : "tconst" in r && "tconst" in item
        ? r.tconst === item.tconst
        : false
    );

  const renderItem = (result: SearchResult, index: number, recent = false) => {
    if ("nconst" in result) {
      return (
        <PersonResultItem
          key={`person-${result.nconst}-${index}`}
          result={result}
          onSelect={() => onSelect?.(result)}
          isRecent={recent}
        />
      );
    } else if ("endYear" in result) {
      return (
        <SerieResultItem
          key={`serie-${result.tconst}-${index}`}
          result={result}
          onSelect={() => onSelect?.(result)}
          isRecent={recent}
        />
      );
    } else {
      return (
        <MovieResultItem
          key={`movie-${result.tconst}-${index}`}
          result={result}
          onSelect={() => onSelect?.(result)}
          isRecent={recent}
        />
      );
    }
  };

  return (
    <div className="absolute z-25 w-full bg-neutral-800 border-2 border-t-0 border-white rounded-b-lg shadow-md text-sm text-gray-300 max-h-72 overflow-y-auto">
      {loading ? (
        <div className="px-4 py-2 text-gray-400 italic">{t("loading")}</div>
      ) : results.length === 0 && recentResults.length === 0 ? (
        <div className="px-4 py-2 text-gray-400 italic">{t("no_data")}</div>
      ) : (
        <>
          {recentResults.length > 0 && (
            <>
              <div className="px-4 pt-2 pb-1 text-xs uppercase tracking-wider text-red-500 font-semibold">
                {t("recent_searches")}
              </div>
              {recentResults.map((result, index) =>
                renderItem(result, index, true)
              )}
              <hr className="border-gray-600 my-2" />
            </>
          )}
          {results.map((result, index) =>
            renderItem(result, index, isRecent(result))
          )}
        </>
      )}
    </div>
  );
};

export default SearchResultDropdown;
