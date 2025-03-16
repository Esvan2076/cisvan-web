import React, { useState, useRef, useEffect } from "react";
import { IconType } from "react-icons";
import DropdownItem from "../atom/DropdownItem";

interface DropdownMenuProps {
  icon: IconType;
  text: string;
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ icon: Icon, text, options, selectedOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cierra el menú si se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Botón que activa el menú */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md bg-neutral-800 text-white transition-all hover:bg-neutral-700"
      >
        <Icon className="text-xl" />
        <span className="hidden lg:inline">{text}</span>
      </button>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-neutral-800 border border-neutral-600 rounded-md shadow-lg">
          {options.map((option, index) => (
            <DropdownItem
              key={index}
              text={option}
              isSelected={selectedOption === option}
              onClick={() => {
                onSelect(option);
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
