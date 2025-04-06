import { useState } from "react";
import { useTranslation } from "react-i18next";
import RatingStarIcon from "../atoms/RatingStarIcon";
import TextAtom from "../atoms/TextAtom";

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
      className={`flex flex-col items-center w-full rounded-md cursor-pointer select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TextAtom className="text-white select-none">
        {isHovered ? t("votes") : t("rating")}
      </TextAtom>

      <div className="flex items-center gap-2 select-none">
        <RatingStarIcon filled className="text-red-500" />
        <TextAtom className="text-white select-none">
          {isHovered 
            ? votes.toLocaleString(i18n.language)
            : score.toFixed(2)}
          {!isHovered && <span className="text-gray-400 select-none">/10.00</span>}
        </TextAtom>
      </div>
    </div>
  );
};

export default ScoreBox;
