import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import FilterDropdown from "../organisms/FilterDropdown";
import SearchResultDropdown from "../organisms/SearchResultDropdown";
import { usePersonSearch } from "../../hooks/usePersonSearch";
import { useMovieSearch } from "../../hooks/useMovieSearch";
import { useSerieSearch } from "../../hooks/useSerieSearch";
import { useGlobalSearch } from "../../hooks/useGlobalSearch";
import { useClickOutside } from "../../hooks/shared/useClickOutside";

const SearchBar: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectedFilter = localStorage.getItem("selectedFilter") || "all";
  const isPersonFilter = selectedFilter === "person";
  const isMovieFilter = selectedFilter === "movie";
  const isSerieFilter = selectedFilter === "serie";
  const isGlobalFilter = selectedFilter === "all";

  const { results: personResults, loading: loadingPersons } = usePersonSearch(searchTerm, isPersonFilter);
  const { results: movieResults, loading: loadingMovies } = useMovieSearch(searchTerm, isMovieFilter);
  const { results: serieResults, loading: loadingSeries } = useSerieSearch(searchTerm, isSerieFilter);
  const { results: globalResults, loading: loadingGlobal } = useGlobalSearch(searchTerm, isGlobalFilter);

  const wrapperRef = useRef<HTMLDivElement>(null);
  useClickOutside(wrapperRef, () => setIsDropdownOpen(false));

  const handleSearch = () => {
    if (isPersonFilter && personResults.length > 0) {
      navigate(`/person/${personResults[0].nconst}`);
    } else if (isMovieFilter && movieResults.length > 0) {
      navigate(`/content/${movieResults[0].primaryTitle}`);
    } else if (isSerieFilter && serieResults.length > 0) {
      navigate(`/content/${serieResults[0].primaryTitle}`);
    } else if (isGlobalFilter && globalResults.length > 0) {
      const first = globalResults[0];
      if (first.type === "person") {
        navigate(`/person/${first.nconst}`);
      } else {
        navigate(`/content/${first.primaryTitle}`);
      }
    } else if (searchTerm.trim()) {
      navigate(`/content/${searchTerm}`);
    }
    setSearchTerm("");
    setIsDropdownOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true);
  };

  const currentResults =
    isPersonFilter ? personResults :
    isMovieFilter ? movieResults :
    isSerieFilter ? serieResults :
    isGlobalFilter ? globalResults :
    [];

  const currentLoading =
    isPersonFilter ? loadingPersons :
    isMovieFilter ? loadingMovies :
    isSerieFilter ? loadingSeries :
    isGlobalFilter ? loadingGlobal :
    false;

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl">
      <div
        className={`flex items-center min-w-[250px] w-full bg-neutral-800 border-2 border-white h-10
        rounded-t-lg ${searchTerm.trim() && isDropdownOpen ? "rounded-b-none" : "rounded-b-lg"}`}
      >
        <FilterDropdown options={["all", "person", "movie", "serie"]} />
        <div className="w-[2px] bg-white h-3/4 hidden sm:block" />
        <input
          type="text"
          aria-label={t("search")}
          className="flex-1 px-3 text-white bg-neutral-800 focus:outline-none text-sm placeholder-gray-400 h-full select-none"
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

      {searchTerm.trim() && isDropdownOpen && (
        <SearchResultDropdown
          filter={selectedFilter}
          results={currentResults}
          loading={currentLoading}
          onSelect={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default SearchBar;
