// components/molecules/RecommendationCard.tsx (todo no seleccionable)
import { Recommendation } from "../../models/Recommendation";
import { useNavigate } from "react-router-dom";

interface Props {
  item: Recommendation;
}

const RecommendationCard: React.FC<Props> = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/content/${item.tconst}`)}
      className="cursor-pointer hover:bg-neutral-700 transition p-3 rounded flex items-center gap-4 border-b border-neutral-700 select-none"
    >
      <img
        src={item.posterUrl}
        alt={item.primaryTitle}
        className="w-20 h-28 object-cover rounded"
      />
      <div className="flex flex-col justify-center text-base">
        <span className="font-semibold text-white leading-tight">
          {item.primaryTitle}
        </span>
        <span className="text-gray-400">
          {item.startYear} • ⭐ {item.titleRating.averageRating.toFixed(1)} (
          {item.titleRating.numVotes.toLocaleString()})
        </span>
      </div>
    </div>
  );
};

export default RecommendationCard;
