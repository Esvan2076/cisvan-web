import React from "react";

interface IconAtomProps {
  icon: React.ElementType; // Recibe un componente de ícono (como FaStar)
  color?: string; // Color del ícono
  className?: string; // Clases adicionales para tamaño o estilos
}

const IconAtom: React.FC<IconAtomProps> = ({ icon: Icon, color = "text-white", className = "" }) => {
  return <Icon className={`text-base sm:text-sm md:text-base lg:text-lg ${color} ${className}`} />;
};

export default IconAtom;
