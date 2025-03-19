import React from "react";

interface TextAtomProps {
  children: React.ReactNode;
  className?: string;
}

const TextAtom: React.FC<TextAtomProps> = ({ children, className = "" }) => {
  return (
    <p className={`font-bold text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl ${className}`}>
      {children}
    </p>
  );
};

export default TextAtom;
