import { useRecommendations } from "../../hooks/useRecommendations";
import RecommendationCard from "../molecules/RecommendationCard";
import { useTranslation } from "react-i18next";

interface Props {
  contentId: string;
}

const RecommendationList: React.FC<Props> = ({ contentId }) => {
  const { t } = useTranslation();
  const { data: recommendations, loading } = useRecommendations(contentId);

  return (
    <div className="w-full bg-neutral-800 rounded p-4 select-none">
      <h2 className="text-lg font-bold text-white mb-2">
        {t("related_content")}
      </h2>
      {loading ? (
        <p className="text-gray-400 text-sm">{t("loading")}</p>
      ) : !recommendations || recommendations.length === 0 ? (
        <p className="text-gray-400 text-sm">{t("no_recommendations")}</p>
      ) : (
        recommendations.map((rec) => (
          <RecommendationCard key={rec.tconst} item={rec} />
        ))
      )}
    </div>
  );
};

export default RecommendationList;
