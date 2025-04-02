import React, { JSX } from "react";

interface TextAtomProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements; // Permite personalizar el tipo de elemento (p, span, h1, etc.)
}

const TextAtom: React.FC<TextAtomProps> = ({ children, className = "", as: Tag = "span" }) => {
  return (
    <Tag className={`font-bold text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl ${className}`}>
      {children}
    </Tag>
  );
};

export default TextAtom;
