import { useTranslation } from "react-i18next";
import { FaRegFileAlt, FaUserCircle, FaGlobe } from "react-icons/fa";

import DropdownMenu from "../organisms/DropdownMenu";
import CisvanButton from "../molecules/button/CisvanButton";
import SearchBar from "../organisms/search/SearchBar";
import IconButton from "../molecules/button/IconButton";

const Header: React.FC = () => {
  const { t } = useTranslation(); // Para traducir textos en el header

  return (
    <header className="h-18 w-full bg-neutral-800 flex items-center px-2 sm:px-3 md:px-4 lg:px-4 xl:px-4">
        <nav
          className="w-full max-w-7xl mx-auto flex items-center justify-between"
          role="navigation"
        >
        {/* Botón Izquierdo */}
        <CisvanButton />

        {/* Botón Central con margen dinámico */}
        <div className="flex-1 mx-2 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-12 max-w-full">
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
            options={["es", "en"]}
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
