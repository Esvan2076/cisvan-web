import { useTranslation } from "react-i18next";
import { FaSearch, FaTrash } from "react-icons/fa";
import FilterDropdown from "./FilterDropdown";
import SearchResultDropdown from "./SearchResultDropdown";
import { useSearchLogic } from "../../../hooks/useSearchLogic";

const SearchBar: React.FC = () => {
  const { t } = useTranslation();
  const {
    wrapperRef,
    searchTerm,
    handleChange,
    handleKeyDown,
    handleSearch,
    isDropdownOpen,
    setIsDropdownOpen,
    currentResults,
    currentLoading,
    recentResults,
    handleSelectResult,
    clearRecentSearches,
    selectedFilter,
    refreshRecentSearches, // ✅ nuevo hook helper
  } = useSearchLogic();

  const isGlobalFilter = selectedFilter === "all";

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl">
      <div
        className={`flex items-center min-w-[250px] w-full bg-neutral-800 border-2 border-white h-10
        ${isDropdownOpen ? "rounded-t-lg rounded-b-none" : "rounded-lg"}`}
      >
        <FilterDropdown
          options={["all", "person", "movie", "serie"]}
          redirectOption={{ label: t("filters.advanced_search"), route: "/advanced-search" }}
        />

        <div className="w-[2px] bg-white h-3/4 hidden sm:block" />

        <input
          type="text"
          aria-label={t("search")}
          className="flex-1 px-3 text-white bg-neutral-800 focus:outline-none text-sm placeholder-gray-400 h-full select-none rounded-lg"
          placeholder={t("search")}
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (isGlobalFilter) {
              refreshRecentSearches();
            }
            setIsDropdownOpen(true);
          }}
          maxLength={255}
        />

        {recentResults.length > 0 && (
          <button
            onClick={clearRecentSearches}
            className="px-2 h-full flex items-center hover:bg-neutral-700 transition-colors text-white"
            title="Borrar recientes"
          >
            <FaTrash />
          </button>
        )}

        <button
          onClick={handleSearch}
          disabled={currentResults.length === 0}
          className={`px-3 h-full flex items-center transition-colors duration-200 ${
            currentResults.length === 0
              ? "text-gray-500"
              : "hover:bg-neutral-700 text-white rounded-lg"
          }`}
        >
          <FaSearch className="text-lg" />
        </button>
      </div>

      {isDropdownOpen && (
        <SearchResultDropdown
          results={currentResults}
          loading={currentLoading}
          recentResults={recentResults}
          onSelect={handleSelectResult}
        />
      )}
    </div>
  );
};

export default SearchBar;
