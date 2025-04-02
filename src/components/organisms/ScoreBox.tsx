import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import TextAtom from "../atoms/TextAtomProps";

interface ScoreBoxProps {
  score: number; // Calificación numérica
  votes: number; // Número de votos
  className?: string; // Estilos adicionales
}

const ScoreBox: React.FC<ScoreBoxProps> = ({ score = 0, votes = 0, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { t, i18n } = useTranslation(); // Traducción con idioma

  return (
    <div
      className={`flex flex-col items-center w-full rounded-md cursor-pointer select-none ${className}`} // No seleccionable
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Texto superior traducido */}
      <TextAtom className="text-white select-none">{isHovered ? t("votes") : t("rating")}</TextAtom>

      {/* Puntuación con estrella */}
      <div className="flex items-center gap-2 select-none">
        <FaStar className="text-red-500 text-lg sm:text-xl md:text-2xl lg:text-3xl pointer-events-none" /> {/* Sin eventos */}
        <TextAtom className="text-white select-none">
          {isHovered 
            ? votes.toLocaleString(i18n.language) // Agrega comas a los votos según el idioma
            : score.toFixed(2)}
          {!isHovered && <span className="text-gray-400 select-none">/10.00</span>}
        </TextAtom>
      </div>
    </div>
  );
};

export default ScoreBox;
