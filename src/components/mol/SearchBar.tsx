import { FaSearch, FaChevronRight } from "react-icons/fa";

const SearchBar: React.FC = () => {
  return (
    <div className="flex items-center min-w-[250px] w-full max-w-xl bg-neutral-800 border-2 border-white rounded-lg h-10">
      {/* Botón de Filtro (oculto en pantallas pequeñas) */}
      <button className="flex items-center gap-1 px-3 py-2 font-bold text-white text-sm whitespace-nowrap 
                         hover:bg-neutral-700 transition-colors duration-200 hidden sm:flex rounded-l-lg h-full">
        FILTRO <FaChevronRight className="text-sm rounded-lg" />
      </button>

      {/* Línea de separación */}
      <div className="w-[2px] bg-white h-3/4 hidden sm:block"></div>

      {/* Input de Búsqueda */}
      <input
        type="text"
        className="flex-1 min-w-[100px] px-3 text-white bg-neutral-800 focus:outline-none text-sm placeholder-gray-400 h-full rounded-lg"
        placeholder="Buscar..."
      />

      {/* Botón de Búsqueda */}
      <button className="px-3 hover:bg-neutral-700 transition-colors duration-200 h-full flex items-center rounded-lg">
        <FaSearch className="text-white text-lg" />
      </button>
    </div>
  );
};

export default SearchBar;
