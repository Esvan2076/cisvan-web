import { useState, useRef } from "react";
import { FaUserCircle, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useClickOutside } from "../../hooks/shared/useClickOutside";
import { useTranslation } from "react-i18next";

interface Props {
  username: string;
  onLogout: () => void;
  onConfig: () => void;
  className?: string;
  isAdmin?: boolean; // ← nuevo
}

const UserDropdownMenu: React.FC<Props> = ({
  username,
  onLogout,
  onConfig,
  className = "",
  isAdmin
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation();

  useClickOutside(ref, () => setIsOpen(false));

  const displayName =
    username.length > 8 ? username.slice(0, 8) + "..." : username;

  return (
    <div className={`relative z-50 ${className}`} ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 sm:px-3 py-2 font-bold text-white text-sm whitespace-nowrap 
                   hover:bg-neutral-700 transition-colors duration-200 rounded-lg h-full select-none"
      >
        <FaUserCircle className="text-xl sm:text-2xl" />
        <span className="hidden sm:inline">{displayName}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-neutral-800 border border-neutral-600 rounded-md shadow-lg text-sm overflow-hidden">
          {isAdmin && (
            <button
              onClick={() => {
                window.location.href = "/admin/reports";
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-yellow-400 bg-yellow-900 hover:bg-yellow-800 flex items-center gap-2"
            >
              ⚠️ Admin
            </button>
          )}

          <button
            onClick={() => {
              onConfig();
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-white flex items-center gap-2 hover:bg-neutral-700 rounded-t-md"
          >
            <FaCog /> {t("profile")}
          </button>
          <button
            onClick={() => {
              onLogout();
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-red-400 bg-red-950 hover:bg-red-800 flex items-center gap-2 rounded-b-md"
          >
            <FaSignOutAlt /> {t("logout")}
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdownMenu;
