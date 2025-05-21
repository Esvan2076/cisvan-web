import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FaRegFileAlt, FaUserCircle, FaGlobe } from "react-icons/fa";
import DropdownMenu from "../organisms/DropdownMenu";
import CisvanButton from "../molecules/button/CisvanButton";
import SearchBar from "../organisms/search/SearchBar";
import IconButton from "../molecules/button/IconButton";
import { useAuth } from "../../hooks/useAuth";
import UserDropdownMenu from "../organisms/UserDropdownMenu";

const Header: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <header className="h-18 w-full bg-neutral-800 flex items-center px-2 sm:px-3 md:px-4 lg:px-4 xl:px-4">
      <nav
        className="w-full max-w-7xl mx-auto flex items-center justify-between"
        role="navigation"
      >
        <CisvanButton />

        <div className="flex-1 mx-2 sm:mx-4 lg:mx-8 min-w-0">
          <SearchBar />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <div className="hidden [@media(max-width:340px)]:hidden sm:flex">
            <IconButton
              icon={FaRegFileAlt}
              text={t("history")}
              onClick={() => {
                if (!user) {
                  navigate("/auth");
                } else {
                  navigate(`/history/${user.id}`);
                }
              }}
            />
          </div>

          {user ? (
            <UserDropdownMenu
              username={user.username}
              onLogout={logout}
              onConfig={() => navigate("/config")}
              className={user.admin ? "border-2 border-red-500 rounded-lg" : ""}
            />
          ) : (
            <IconButton
              icon={FaUserCircle}
              text={t("login")}
              onClick={() => navigate("/auth")}
            />
          )}

          <div className="hidden [@media(max-width:340px)]:hidden sm:flex">
            <DropdownMenu
              icon={FaGlobe}
              text={t("language")}
              options={["es", "en"]}
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
