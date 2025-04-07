import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import FilterDropdown from "../organisms/FilterDropdown";

const SearchBar: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/content/${searchTerm}`);
      setSearchTerm("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex items-center min-w-[250px] w-full max-w-xl bg-neutral-800 border-2 border-white rounded-lg h-10">
      <FilterDropdown options={["all", "movies", "actors", "directors"]} />
      <div className="w-[2px] bg-white h-3/4 hidden sm:block"></div>

      <input
        type="text"
        aria-label={t("search")}
        className="flex-1 px-3 text-white bg-neutral-800 focus:outline-none text-sm placeholder-gray-400 h-full rounded-lg select-none"
        placeholder={t("search")}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        maxLength={255}
      />

      <button
        onClick={handleSearch}
        className="px-3 hover:bg-neutral-700 transition-colors duration-200 h-full flex items-center rounded-lg"
      >
        <FaSearch className="text-white text-lg" />
      </button>
    </div>
  );
};

export default SearchBar;
