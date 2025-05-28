import { useTranslation } from "react-i18next";
import { FaClock, FaStar } from "react-icons/fa";
import { UnifiedSearchItem } from "../../../models/searchResult";

interface Props {
  unifiedResults: UnifiedSearchItem[];
  loading: boolean;
  onSelect?: (item: UnifiedSearchItem) => void;
}

const SearchResultDropdown: React.FC<Props> = ({
  unifiedResults,
  loading,
  onSelect,
}) => {
  const { t } = useTranslation();

  // En SearchResultDropdown.tsx - añadir logs para depuración
  const getItemIcon = (item: UnifiedSearchItem) => {
    console.log(`Item ${item.title}: recent=${item.recent}, popular=${item.popular}`);
    
    if (item.recent) {
      return <FaClock className="ml-3 text-red-500 text-base" title="Reciente" />;
    } else if (item.popular) {
      return <FaStar className="ml-3 text-yellow-500 text-base" title="Popular" />;
    }
    return null;
  };

  const getItemLink = (item: UnifiedSearchItem) => {
    return item.type === "person" 
      ? `/person/${item.id}` 
      : `/content/${item.id}`;
  };

  return (
    <div className="absolute z-25 w-full bg-neutral-800 border-2 border-t-0 border-white rounded-b-lg shadow-md text-sm text-gray-300 max-h-72 overflow-y-auto">
      {loading ? (
        <div className="px-4 py-2 text-gray-400 italic">{t("loading")}</div>
      ) : unifiedResults.length === 0 ? (
        <div className="px-4 py-2 text-gray-400 italic">{t("no_data")}</div>
      ) : (
        unifiedResults.map((item, index) => (
          <a
            key={`${item.type}-${item.id}-${index}`}
            href={getItemLink(item)}
            onClick={(e) => {
              e.preventDefault();
              onSelect?.(item);
            }}
            className="flex justify-between items-center w-full px-4 py-2 hover:bg-neutral-700 transition-colors text-white"
          >
            <div className="flex flex-col text-sm">
              <span className="font-semibold">{item.title}</span>
              {item.subtitle && (
                <span className="text-gray-400">{item.subtitle}</span>
              )}
            </div>
            {getItemIcon(item)}
          </a>
        ))
      )}
    </div>
  );
};

export default SearchResultDropdown;