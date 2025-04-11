import { useTranslation } from "react-i18next";
import { Episode } from "../../../models/episode";

interface EpisodeCardProps {
  episode: Episode;
  isCurrent?: boolean;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode, isCurrent }) => {
  const { t } = useTranslation();

  return (
    <li
      className={`bg-neutral-700 p-3 rounded-md ${isCurrent ? "border-2 border-red-600" : ""}`}
    >
      <a
        href={`/content/${episode.tconst}`}
        className="font-semibold text-white hover:underline block"
      >
        Ep. {episode.episodeNumber}: {episode.primaryTitle}
      </a>
      <p className="text-xs text-gray-300 mt-1">
        ⭐ {episode.averageRating?.toFixed(2) ?? "?"}/10.00 —{" "}
        {episode.numVotes?.toLocaleString() ?? 0} {t("votes_suffix")}
      </p>
    </li>
  );
};

export default EpisodeCard;
