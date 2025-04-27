// src/components/organisms/UserDropdownMenu.tsx
import { useState, useRef } from "react";
import { FaUserCircle, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useClickOutside } from "../../hooks/shared/useClickOutside";
import { useTranslation } from "react-i18next";

interface Props {
  username: string;
  onLogout: () => void;
  onConfig: () => void;
}

const UserDropdownMenu: React.FC<Props> = ({
  username,
  onLogout,
  onConfig,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation();

  useClickOutside(ref, () => setIsOpen(false));

  const displayName =
    username.length > 8 ? username.slice(0, 8) + "..." : username;

  return (
    <div className="relative z-50" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 sm:px-3 py-2 font-bold text-white text-sm whitespace-nowrap 
                   hover:bg-neutral-700 transition-colors duration-200 rounded-lg h-full select-none"
      >
        <FaUserCircle className="text-xl sm:text-2xl" />
        <span className="hidden sm:inline">{displayName}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-neutral-800 border border-neutral-600 rounded-md shadow-lg text-sm">
          <button
            onClick={() => {
              onConfig();
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-white flex items-center gap-2 hover:bg-neutral-700"
          >
            <FaCog /> {t("profile")}
          </button>
          <button
            onClick={() => {
              onLogout();
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-red-400 bg-red-950 hover:bg-red-800 flex items-center gap-2"
          >
            <FaSignOutAlt /> {t("logout")}
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdownMenu;
