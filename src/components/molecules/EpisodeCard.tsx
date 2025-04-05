import { Link } from "react-router-dom";
import { Episode } from "../../services/getEpisodesBySeason";

interface Props {
  episode: Episode;
}

const EpisodeCard: React.FC<Props> = ({ episode }) => (
  <li className="bg-neutral-700 p-3 rounded-md select-none">
    <Link
      to={`/subject/${episode.tconst}`}
      className="font-semibold text-white hover:underline block"
    >
      Ep. {episode.episodeNumber}: {episode.primaryTitle}
    </Link>
    <p className="text-xs text-gray-300 mt-1">
      ⭐ {episode.averageRating != null ? `${episode.averageRating.toFixed(2)}/10.00` : "Sin calificación"} —{" "}
      {episode.numVotes?.toLocaleString() ?? 0} votos
    </p>
  </li>
);

export default EpisodeCard;
