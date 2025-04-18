import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface Props {
  title: string;
  children: React.ReactNode;
}

const FilterBox: React.FC<Props> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white rounded-md overflow-hidden mb-4">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full bg-neutral-900 text-white px-4 py-2 border-b border-white flex justify-between items-center"
      >
        <span className="text-sm font-medium">{title}</span>
        <FaChevronDown
          className={`text-white text-xs transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isOpen && (
        <div className="px-4 py-3 max-h-48 overflow-y-auto flex flex-wrap gap-2">
          {children}
        </div>
      )}
    </div>
  );
};

export default FilterBox;
