import { Link } from "react-router-dom";
import { MovieResult } from "../../../models/searchResult";

interface Props {
  result: MovieResult;
  onSelect?: () => void;
}

const MovieResultItem: React.FC<Props> = ({ result, onSelect }) => {
  return (
    <Link
      to={`/content/${encodeURIComponent(result.tconst)}`}
      onClick={onSelect}
      className="flex justify-between items-center w-full px-4 py-2 hover:bg-neutral-700 transition-colors text-white"
    >
      <div className="flex flex-col text-sm">
        <span className="font-semibold">{result.primaryTitle}</span>
        <span className="text-gray-400">
          {result.startYear}
          {result.actors && ` — ${result.actors}`}
        </span>
      </div>
    </Link>
  );
};

export default MovieResultItem;
