import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import TitleFilters from "./filters/TitleFilters";
import PersonFilters from "./filters/PersonFilters";
import UserFilters from "./filters/UserFilters";
import { TitleSearchFilters } from "../../hooks/useTitleSearch";
import { PersonSearchFilters } from "../../hooks/usePersonSearch";

type TabOption = "titles" | "persons" | "users";

interface Props {
  onSearch: (
    filters: TitleSearchFilters | PersonSearchFilters,
    tab: TabOption
  ) => void;
  activeTab: TabOption;
  setActiveTab: (tab: TabOption) => void;
}

const AdvancedFilterPanel: React.FC<Props> = ({
  onSearch,
  activeTab,
  setActiveTab,
}) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedProfessions, setSelectedProfessions] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleSearch = () => {
    // Si está en "users", permitir búsquedas vacías
    if (activeTab !== "users" && !searchTerm.trim() && !hasFilters()) return;

    if (activeTab === "titles") {
      const payload: TitleSearchFilters = {
        name: searchTerm,
        category:
          selectedCategory === 1 ||
          selectedCategory === 2 ||
          selectedCategory === 3
            ? selectedCategory
            : undefined,
        types: selectedTypes.length ? selectedTypes : undefined,
        genres: selectedGenres.length ? selectedGenres : undefined,
        streamingServices: selectedPlatforms[0] ?? undefined,
      };
      onSearch(payload, "titles");
    }

    if (activeTab === "persons") {
      const payload: PersonSearchFilters = {
        name: searchTerm,
        professions: selectedProfessions.length
          ? selectedProfessions
          : undefined,
      };
      onSearch(payload, "persons");
    }

    if (activeTab === "users") {
      const payload = { name: searchTerm }; // puede estar vacío
      onSearch(payload, "users");
    }
  };

  const hasFilters = () => {
    return (
      selectedCategory !== null || // 👈 añadir esta línea
      selectedTypes.length > 0 ||
      selectedGenres.length > 0 ||
      selectedPlatforms.length > 0 ||
      selectedProfessions.length > 0
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((searchTerm.trim() || hasFilters()) && e.key === "Enter") {
      handleSearch();
    }
  };

  const renderFilters = () => {
    switch (activeTab) {
      case "titles":
        return (
          <TitleFilters
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
            selectedPlatforms={selectedPlatforms}
            setSelectedPlatforms={setSelectedPlatforms}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        );
      case "persons":
        return (
          <PersonFilters
            selectedProfessions={selectedProfessions}
            setSelectedProfessions={setSelectedProfessions}
          />
        );
      case "users":
        return <UserFilters />;
      default:
        return null;
    }
  };

  const TABS: TabOption[] = ["titles", "persons", "users"];

  return (
    <div className="w-full">
      <div className="flex items-center bg-neutral-800 border border-white h-12 rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          placeholder={t("search")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 text-white bg-neutral-800 focus:outline-none text-base placeholder-gray-400 h-full select-none"
          maxLength={255}
        />
        <button
          onClick={handleSearch}
          disabled={
            activeTab !== "users" && !searchTerm.trim() && !hasFilters()
          }
          className={`px-4 h-full flex items-center transition-colors duration-200 ${
            activeTab === "users" || searchTerm.trim() || hasFilters()
              ? "hover:bg-neutral-700 text-white"
              : "text-gray-500 cursor-not-allowed"
          }`}
        >
          <FaSearch className="text-lg" />
        </button>
      </div>

      <div className="flex items-center border-b border-white mb-6">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setSearchTerm("");
              setSelectedTypes([]);
              setSelectedGenres([]);
              setSelectedPlatforms([]);
              setSelectedProfessions([]);
            }}
            className={`px-6 py-2 text-base font-semibold border border-white rounded-t-md transition-colors duration-200 ${
              activeTab === tab
                ? "bg-white text-black"
                : "bg-neutral-800 text-gray-400"
            }`}
          >
            {t(`advanced_search.tabs.${tab}`)}
          </button>
        ))}
      </div>

      {renderFilters()}
    </div>
  );
};

export default AdvancedFilterPanel;
