import { Episode } from "../../services/episodeService";

interface EpisodeCardProps {
  episode: Episode;
  isCurrent?: boolean;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode, isCurrent }) => {
  return (
    <li className={`bg-neutral-700 p-3 rounded-md ${isCurrent ? "border-2 border-red-600" : ""}`}>
      <a
        href={`/subject/${episode.tconst}`}
        className="font-semibold text-white hover:underline block"
      >
        Ep. {episode.episodeNumber}: {episode.primaryTitle}
      </a>
      <p className="text-xs text-gray-300 mt-1">
        ⭐ {episode.averageRating?.toFixed(2) ?? "?"}/10.00 —{" "}
        {episode.numVotes?.toLocaleString() ?? 0} votos
      </p>
    </li>
  );
};

export default EpisodeCard;
