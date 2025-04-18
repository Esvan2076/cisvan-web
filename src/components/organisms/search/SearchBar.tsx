// src/components/molecules/SearchBar.tsx
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";
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
    recentResults, // 👈 nuevo
    handleSelectResult, // 👈 nuevo
  } = useSearchLogic();  

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl">
      <div
        className={`flex items-center min-w-[250px] w-full bg-neutral-800 border-2 border-white h-10
        rounded-t-lg ${searchTerm.trim() && isDropdownOpen ? "rounded-b-none" : "rounded-b-lg"}`}
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
            if (searchTerm.trim()) {
              setIsDropdownOpen(true);
            }
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
