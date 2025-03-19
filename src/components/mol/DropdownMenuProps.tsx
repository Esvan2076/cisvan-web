import React, { useState, useRef } from "react";
import { IconType } from "react-icons";
import { useTranslation } from "react-i18next";
import DropdownItem from "../atom/DropdownItem";
import useClickOutside from "../../hooks/useClickOutside";

interface DropdownMenuProps {
  icon: IconType;
  text: string;
  options: string[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ icon: Icon, text, options }) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const selectedLanguage = i18n.language;

  // Usar hook personalizado para cerrar el menú al hacer clic fuera
  useClickOutside(menuRef, () => setIsOpen(false));

  return (
    <div className="relative z-50" ref={menuRef}>
      {/* Botón que activa el menú */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md bg-neutral-800 text-white transition-all hover:bg-neutral-700"
      >
        <Icon className="text-xl" />
        <span className="hidden lg:inline select-none">{text}</span>
      </button>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-neutral-800 border border-neutral-600 rounded-md shadow-lg">
          {options.map((option) => (
            <DropdownItem
              key={option}
              text={t(`languages.${option}`)}
              isSelected={selectedLanguage === option}
              onClick={() => {
                i18n.changeLanguage(option);
                setIsOpen(false);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
