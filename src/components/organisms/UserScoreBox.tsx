import { useState } from "react";
import { useTranslation } from "react-i18next";
import RatingStarIcon from "../atoms/RatingStarIcon";
import TextAtom from "../atoms/TextAtom";

interface UserScoreBoxProps {
  score?: number;
  hasRated: boolean;
  ratingDate?: string;
  className?: string;
}

const UserScoreBox: React.FC<UserScoreBoxProps> = ({
  score = 0,
  hasRated,
  ratingDate = "00/00/00",
  className = ""
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();

  const renderScore = () => {
    const formattedScore = score?.toFixed(2);
    return (
      <>
        {formattedScore}
        <span className="text-gray-400 select-none">/10.00</span>
      </>
    );
  };

  return (
    <div
      className={`flex flex-col items-center w-full rounded-md cursor-pointer transition duration-300 select-none ${
        isHovered ? "bg-neutral-800" : "bg-neutral-900"
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TextAtom className="text-white select-none">
        {hasRated ? (isHovered ? t("date") : t("your_rating")) : t("your_rating")}
      </TextAtom>

      <div className="flex items-center gap-2">
        <RatingStarIcon filled={hasRated} />
        <TextAtom className="text-white select-none">
          {hasRated
            ? isHovered
              ? ratingDate
              : renderScore()
            : isHovered
              ? t("rate")
              : t("unrated")}
        </TextAtom>
      </div>
    </div>
  );
};

export default UserScoreBox;
