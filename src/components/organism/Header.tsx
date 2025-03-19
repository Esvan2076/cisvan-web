import { FaRegFileAlt, FaUserCircle, FaGlobe } from "react-icons/fa";
import CisvanButton from "../atom/CisvanButton";
import SearchBar from "../mol/SearchBar";
import { useTranslation } from "react-i18next";
import IconButton from "../atom/IconButton";
import DropdownMenu from "../mol/DropdownMenuProps";

const Header: React.FC = () => {
  const { t } = useTranslation(); // Para traducir textos en el header

  return (
    <header className="h-20 sm:h-18 w-full bg-neutral-800 flex items-center px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        {/* Botón Izquierdo */}
        <CisvanButton />

        {/* Botón Central con margen dinámico */}
        <div className="flex-1 mx-4 sm:mx-6 md:mx-12 lg:mx-20 xl:mx-32 max-w-lg sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
          <SearchBar />
        </div>

        {/* Botones Derechos */}
        <div className="flex items-center gap-2 ml-auto">
          <IconButton icon={FaRegFileAlt} text={t("history")} />
          <IconButton icon={FaUserCircle} text={t("login")} />

          {/* Menú desplegable de idioma con indicador */}
          <DropdownMenu
            icon={FaGlobe}
            text={t("language")}
            options={["es", "en"]} // Idiomas en clave para traducir dinámicamente
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
