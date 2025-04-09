import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import FilterDropdown from "../organisms/FilterDropdown";
import SearchResultDropdown from "../organisms/SearchResultDropdown";
import { usePersonSearch } from "../../hooks/usePersonSearch";
import { useClickOutside } from "../../hooks/shared/useClickOutside";

const SearchBar: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectedFilter = localStorage.getItem("selectedFilter") || "all";
  const isPersonFilter = selectedFilter === "person";

  const { results, loading } = usePersonSearch(searchTerm, isPersonFilter);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside(wrapperRef, () => {
    setIsDropdownOpen(false);
  });

  const handleSearch = () => {
    if (isPersonFilter && results.length > 0) {
      navigate(`/person/${results[0].nconst}`);
      setSearchTerm("");
      setIsDropdownOpen(false);
      return;
    }

    if (searchTerm.trim() !== "") {
      navigate(`/content/${searchTerm}`);
      setSearchTerm("");
      setIsDropdownOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl">
      <div
        className={`flex items-center min-w-[250px] w-full bg-neutral-800 border-2 border-white h-10
          rounded-t-lg ${isPersonFilter && searchTerm.trim().length > 0 && isDropdownOpen ? "rounded-b-none" : "rounded-b-lg"}`}
      >
        <FilterDropdown options={["all", "person", "movie", "serie"]} />
        <div className="w-[2px] bg-white h-3/4 hidden sm:block"></div>

        <input
          type="text"
          aria-label={t("search")}
          className="flex-1 px-3 text-white bg-neutral-800 focus:outline-none text-sm placeholder-gray-400 h-full select-none rounded-lg"
          placeholder={t("search")}
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          maxLength={255}
        />

        <button
          onClick={handleSearch}
          className="px-3 hover:bg-neutral-700 transition-colors duration-200 h-full flex items-center"
        >
          <FaSearch className="text-white text-lg" />
        </button>
      </div>

      {isPersonFilter && searchTerm.trim().length > 0 && isDropdownOpen && (
        <SearchResultDropdown
          results={results}
          loading={loading}
          onSelect={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default SearchBar;
