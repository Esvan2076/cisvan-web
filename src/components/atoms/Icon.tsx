import React from "react";

interface IconProps {
  icon: React.ElementType; // Recibe un componente de ícono (como FaStar)
  color?: string; // Color del ícono
  className?: string; // Clases adicionales para tamaño o estilos
}

const Icon: React.FC<IconProps> = ({ icon: Icon, color = "text-white", className = "" }) => {
  return <Icon className={`text-base sm:text-sm md:text-base lg:text-lg ${color} ${className}`} />;
};

export default Icon;
