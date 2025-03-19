import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import DropdownItem from "../atom/DropdownItem";
import useClickOutside from "../../hooks/useClickOutside";

interface FilterDropdownProps {
  options: string[];
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ options }) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Carga el filtro seleccionado desde localStorage o usa el valor por defecto
  const [selectedOption, setSelectedOption] = useState(
    localStorage.getItem("selectedFilter") || t("filters.all")
  );

  // Actualiza el texto cuando cambia el idioma
  useEffect(() => {
    const savedOption = localStorage.getItem("selectedFilter");
    if (savedOption) {
      setSelectedOption(t(`filters.${savedOption}`));
    } else {
      setSelectedOption(t("filters.all"));
    }
  }, [t, i18n.language]);

  // Cerrar menú al hacer clic fuera
  useClickOutside(menuRef, () => setIsOpen(false));

  // Manejar la selección de filtro
  const handleSelection = (option: string) => {
    localStorage.setItem("selectedFilter", option); // Guardar en localStorage
    setSelectedOption(t(`filters.${option}`)); // Actualizar estado
    setIsOpen(false);
  };

  return (
    <div className="relative z-50" ref={menuRef}>
      {/* Botón que activa el menú */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 font-bold text-white text-sm whitespace-nowrap 
                   hover:bg-neutral-700 transition-colors duration-200 hidden sm:flex rounded-l-lg h-full select-none"
      >
        {selectedOption}
        <FaChevronDown
          className={`text-sm transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-40 bg-neutral-800 border border-neutral-600 rounded-md shadow-lg">
          {options.map((option) => (
            <DropdownItem
              key={option}
              text={t(`filters.${option}`)}
              isSelected={selectedOption === t(`filters.${option}`)}
              onClick={() => handleSelection(option)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
