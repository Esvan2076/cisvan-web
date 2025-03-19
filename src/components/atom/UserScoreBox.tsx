import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import TextAtom from "../atom/TextAtomProps";

interface UserScoreBoxProps {
  score?: number; // Calificación del usuario (opcional si no ha calificado)
  hasRated: boolean; // Booleano para saber si el usuario ya calificó
  ratingDate?: string; // Fecha en la que calificó
  className?: string; // Estilos adicionales
}

const UserScoreBox: React.FC<UserScoreBoxProps> = ({ 
  score = 0, 
  hasRated, 
  ratingDate = "00/00/00", 
  className = "" 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation(); // Traducción

  return (
    <div
      className={`flex flex-col items-center w-full rounded-md cursor-pointer transition duration-300 select-none ${
        isHovered ? "bg-neutral-800" : "bg-neutral-900"
      } ${className}`} // No seleccionable
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Texto superior (Cambia en hover si ha calificado) */}
      <TextAtom className="text-white select-none">
        {hasRated ? (isHovered ? t("date") : t("your_rating")) : t("your_rating")}
      </TextAtom>

      {/* Puntuación con estrella */}
      <div className="flex items-center gap-2">
        {hasRated ? (
          <FaStar className="text-blue-500 text-lg sm:text-xl md:text-2xl lg:text-3xl pointer-events-none" />
        ) : (
          <FaRegStar className="text-blue-500 text-lg sm:text-xl md:text-2xl lg:text-3xl pointer-events-none" />
        )}

        {/* Texto inferior (Cambia en hover si ha calificado) */}
        <TextAtom className="text-white select-none ">
          {hasRated ? (isHovered ? ratingDate : `${score?.toFixed(2)}/10.00`) : (isHovered ? t("rate") : t("unrated"))}
        </TextAtom>
      </div>
    </div>
  );
};

export default UserScoreBox;
