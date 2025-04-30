// components/atoms/ArrowButton.tsx
import React from "react";

interface ArrowButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  position: "left" | "right";
}

const ArrowButton: React.FC<ArrowButtonProps> = ({ onClick, icon, position }) => {
  return (
    <div
      className={`absolute top-1/2 ${position === "left" ? "left-2" : "right-2"} -translate-y-1/2 transform w-12 h-12 flex items-center justify-center bg-black bg-opacity-50 hover:bg-red-500 transition-colors duration-300 rounded-md shadow-md`}
    >
      <button
        onClick={onClick}
        className="w-full h-full flex items-center justify-center"
      >
        {icon}
      </button>
    </div>
  );
};

export default ArrowButton;
