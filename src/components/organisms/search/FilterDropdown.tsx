import { FaChevronDown } from "react-icons/fa";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import DropdownItem from "../../molecules/DropdownItem";
import { useClickOutside } from "../../../hooks/shared/useClickOutside";

interface FilterDropdownProps {
  options: string[];
  redirectOption?: {
    label: string;
    route: string;
  };
  selected: string;
  onChange: (option: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  options,
  redirectOption,
  selected,
  onChange,
}) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const [translatedSelected, setTranslatedSelected] = useState(t(`filters.${selected}`));

  // Actualiza el texto traducido cuando cambia el idioma o el filtro seleccionado
  useEffect(() => {
    setTranslatedSelected(t(`filters.${selected}`));
  }, [selected, t, i18n.language]);

  useClickOutside(menuRef, () => setIsOpen(false));

  const handleSelection = (option: string) => {
    localStorage.setItem("selectedFilter", option);
    onChange(option);
    setIsOpen(false);
  };

  const handleRedirect = () => {
    if (redirectOption) {
      navigate(redirectOption.route);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative z-50" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 font-bold text-white text-sm whitespace-nowrap 
                   hover:bg-neutral-700 transition-colors duration-200 hidden sm:flex rounded-l-lg h-full select-none"
      >
        {translatedSelected}
        <FaChevronDown
          className={`text-sm transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-40 bg-neutral-800 border border-neutral-600 rounded-md shadow-lg">
          {options.map((option) => (
            <DropdownItem
              key={option}
              text={t(`filters.${option}`)}
              isSelected={selected === option}
              onClick={() => handleSelection(option)}
            />
          ))}

          {redirectOption && (
            <div
              onClick={handleRedirect}
              className="px-4 py-2 text-white cursor-pointer hover:bg-neutral-700 flex justify-between items-center"
            >
              {redirectOption.label}
              <HiOutlineDocumentSearch className="text-white" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
