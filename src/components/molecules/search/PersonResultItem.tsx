import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaClock } from "react-icons/fa";
import { PersonResult } from "../../../models/searchResult";

interface Props {
  result: PersonResult;
  onSelect?: () => void;
  isRecent?: boolean;
}

const SearchResultItem: React.FC<Props> = ({ result, onSelect, isRecent }) => {
  const { t } = useTranslation(["professions"]);
  const hasTitle = !!result.principalTitle?.primaryTitle;
  const hasProfession = !!result.primaryProfession;

  const professionList = hasProfession
    ? result.primaryProfession
        .split(",")
        .map((p) => p.trim())
        .map((p) => t(`${p}`, p))
        .join(", ")
    : "";

  return (
    <Link
      to={`/person/${result.nconst}`}
      onClick={onSelect}
      className="flex justify-between items-center w-full px-4 py-2 hover:bg-neutral-700 transition-colors text-white"
    >
      <div className="flex flex-col text-sm">
        <span className="font-semibold">{result.primaryName}</span>
        {(hasProfession || hasTitle) && (
          <span className="text-gray-400">
            {hasProfession && professionList}
            {hasProfession && hasTitle && ", "}
            {hasTitle && (
              <>
                {result.principalTitle.primaryTitle} (
                {result.principalTitle.startYear}
                {result.principalTitle.endYear
                  ? ` - ${result.principalTitle.endYear}`
                  : ""}
                )
              </>
            )}
          </span>
        )}
      </div>
      {isRecent && (
        <FaClock className="ml-3 text-red-500 text-base" title="Reciente" />
      )}
    </Link>
  );
};

export default SearchResultItem;
