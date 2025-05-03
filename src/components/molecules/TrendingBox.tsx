import { useState } from "react";
import { useTranslation } from "react-i18next";
import TextAtom from "../atoms/TextAtom";
import { FaArrowUp } from "react-icons/fa";

interface TrendingBoxProps {
  score: number;
  historical: number;
  className?: string;
}

const TrendingBox: React.FC<TrendingBoxProps> = ({
  score = 0,
  historical = 0,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { t, i18n } = useTranslation();

  return (
    <div
      className={`flex flex-col items-center w-full rounded-md cursor-pointer select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TextAtom className="text-white select-none">
        {isHovered ? t("historical") : t("trending")}
      </TextAtom>

      <div className="flex items-center gap-2 select-none">
        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
          <FaArrowUp className="text-white text-[10px]" />
        </div>

        <TextAtom className="text-white select-none">
          {(isHovered ? historical : score).toLocaleString(i18n.language)}
        </TextAtom>
      </div>
    </div>
  );
};

export default TrendingBox;
