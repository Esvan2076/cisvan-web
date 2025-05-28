import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";
import FilterDropdown from "./FilterDropdown";
import SearchResultDropdown from "./SearchResultDropdown";
import { useSearchLogic } from "../../../hooks/useSearchLogic";
import { useState } from "react";

const SearchBar: React.FC = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState(localStorage.getItem("selectedFilter") || "all");
  const {
    wrapperRef,
    searchTerm,
    setSearchTerm,
    handleChange,
    handleKeyDown,
    handleSearch,
    isDropdownOpen,
    setIsDropdownOpen,
    selectedFilter,
    setFilter: updateFilter,
    currentResults,
    currentLoading,
    handleSelectResult,
    clearRecentSearches,
    refreshRecentSearches,
  } = useSearchLogic();

  // Sync hook filter with local state
  useState(() => {
    if (filter !== selectedFilter) {
      updateFilter(filter);
    }
  });

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl min-w-0">
      <div
        className={`flex items-center w-full bg-neutral-800 border-2 border-white h-10
    ${isDropdownOpen ? "rounded-t-lg rounded-b-none" : "rounded-lg"}`}
      >
        <FilterDropdown
          options={["all", "person", "movie", "serie"]}
          selected={selectedFilter}
          onChange={updateFilter}
          redirectOption={{
            label: t("filters.advanced_search"),
            route: "/advanced-search",
          }}
        />

        <div className="w-[2px] bg-white h-3/4 hidden sm:block" />

        <input
          type="text"
          aria-label={t("search")}
          className="flex-1 px-2 text-white bg-neutral-800 focus:outline-none text-sm placeholder-gray-400 h-full select-none rounded-lg min-w-0"
          placeholder={t("search")}
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            refreshRecentSearches();
            setIsDropdownOpen(true);
          }}
          maxLength={255}
        />

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
          unifiedResults={currentResults}
          loading={currentLoading}
          onSelect={handleSelectResult}
        />
      )}
    </div>
  );
};

export default SearchBar;
