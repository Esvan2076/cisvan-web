import { Link } from "react-router-dom";
import { FaClock } from "react-icons/fa";
import { SerieResult } from "../../../models/searchResult";

interface Props {
  result: SerieResult;
  onSelect?: () => void;
  isRecent?: boolean;
}

const SerieResultItem: React.FC<Props> = ({ result, onSelect, isRecent }) => {
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
          {result.endYear ? ` - ${result.endYear}` : ""}
          {result.actors && ` — ${result.actors}`}
        </span>
      </div>
      {isRecent && (
        <FaClock className="ml-3 text-red-500 text-base" title="Reciente" />
      )}
    </Link>
  );
};

export default SerieResultItem;
