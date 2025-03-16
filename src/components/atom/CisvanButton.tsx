import React from "react";

interface CisvanButtonProps {
  onClick?: () => void;
}

const CisvanButton: React.FC<CisvanButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="h-10 px-3 sm:px-6 text-lg font-bold rounded-lg border-2 border-red-500 text-red-500 bg-transparent 
                 transition-all duration-300 hover:bg-red-500 hover:text-neutral-800"
    >
      <span className="hidden sm:block">CISVAN</span>
      <span className="block sm:hidden">C</span>
    </button>
  );
};

export default CisvanButton;
