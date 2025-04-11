import { FaStar, FaRegStar } from "react-icons/fa";

interface RatingStarIconProps {
  filled: boolean;
  className?: string;
}

const RatingStarIcon: React.FC<RatingStarIconProps> = ({
  filled,
  className = "",
}) => {
  const Icon = filled ? FaStar : FaRegStar;

  return (
    <Icon
      className={`text-blue-500 text-sm sm:text-base md:text-lg lg:text-xl pointer-events-none ${className}`}
    />
  );
};

export default RatingStarIcon;
