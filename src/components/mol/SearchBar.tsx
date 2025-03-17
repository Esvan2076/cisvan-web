import { FaSearch } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import FilterDropdown from "../mol/FilterDropdown";

const SearchBar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center min-w-[250px] w-full max-w-xl bg-neutral-800 border-2 border-white rounded-lg h-10">
      {/* Menú desplegable de filtro */}
      <FilterDropdown options={["all", "movies", "actors", "directors"]} />

      {/* Línea de separación */}
      <div className="w-[2px] bg-white h-3/4 hidden sm:block"></div>

      {/* Input de Búsqueda */}
      <input
        type="text"
        className="flex-1 min-w-[100px] px-3 text-white bg-neutral-800 focus:outline-none text-sm placeholder-gray-400 h-full rounded-lg select-none"
        placeholder={t("search")}
      />

      {/* Botón de Búsqueda */}
      <button className="px-3 hover:bg-neutral-700 transition-colors duration-200 h-full flex items-center rounded-lg">
        <FaSearch className="text-white text-lg" />
      </button>
    </div>
  );
};

export default SearchBar;
