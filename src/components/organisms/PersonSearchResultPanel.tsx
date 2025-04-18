import { useTranslation } from "react-i18next";
import { PersonSearchResult } from "../../models/person";
import ImageBox from "../atoms/ImageBox";
import { Link } from "react-router-dom";

interface Props {
  results: PersonSearchResult[];
  total: number;
  page: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
}

const PersonSearchResultPanel: React.FC<Props> = ({
  results,
  total,
  page,
  totalPages,
  onNext,
  onPrev,
}) => {
  const { t } = useTranslation();

  return (
    <div className="bg-neutral-800 rounded-md p-4 text-white">
      <p className="font-semibold mb-4">
        {t("advanced_search.results_found")}: {total}
      </p>

      {results.length === 0 && (
        <p className="text-gray-400">{t("advanced_search.no_results")}</p>
      )}

      <div className="space-y-4">
        {results.map((person) => (
          <Link
            key={person.nconst}
            to={`/person/${person.nconst}`}
            className="flex items-center gap-4 hover:bg-neutral-700 p-2 rounded transition"
          >
            <div className="w-16 h-24 shrink-0">
              <ImageBox
                src={person.posterUrl || "/default-actor.png"}
                alt={person.primaryName}
                className="rounded-md"
              />
            </div>
            <div>
              <p className="font-semibold">{person.primaryName}</p>
              <p className="text-sm text-gray-400">
                {person.birthYear ?? "?"} - {person.deathYear ?? "?"}
              </p>
              {person.professions?.length && (
                <p className="text-sm text-gray-400">
                  {person.professions.join(", ")}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-between mt-6 text-sm">
        <span className="text-gray-300">
          {t("page")}: {page + 1}/{totalPages}
        </span>
        <div className="flex gap-2">
          {page > 0 && (
            <button
              onClick={onPrev}
              className="px-4 py-1 border border-white rounded hover:bg-neutral-700 transition"
            >
              {t("prev")}
            </button>
          )}
          {page < totalPages - 1 && (
            <button
              onClick={onNext}
              className="px-4 py-1 border border-white rounded hover:bg-neutral-700 transition"
            >
              {t("next")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonSearchResultPanel;
