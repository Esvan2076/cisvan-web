// components/organisms/TitleResultPanel.tsx
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { TitleSearchResult } from "../../models/content";
import ImageBox from "../atoms/ImageBox";

interface Props {
  results: TitleSearchResult[];
  total: number;
  page: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
}

const TitleResultPanel: React.FC<Props> = ({
  results,
  total,
  page,
  totalPages,
  onNext,
  onPrev,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="bg-neutral-800 rounded-md p-4 text-white">
      <p className="font-semibold mb-4">
        {t("advanced_search.results_found")}: {total}
      </p>

      <div className="space-y-4">
        {results.map((item) => (
          <div
            key={item.tconst}
            className="flex items-center gap-4 cursor-pointer hover:bg-neutral-700 p-2 rounded"
            onClick={() => navigate(`/content/${item.tconst}`)}
          >
            <div className="w-16 h-24 shrink-0">
              <ImageBox
                src={item.posterUrl}
                alt={item.primaryTitle}
                className="rounded-md"
              />
            </div>
            <div>
              <p className="font-semibold underline underline-offset-2">
                {item.primaryTitle}
              </p>
              <p className="text-sm text-gray-400">
                {item.startYear} — {t("rating")}: {item.titleRatings?.averageRating ?? "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-6 text-sm">
        <span className="text-gray-300">
          {t("page")} {page + 1}/{totalPages}
        </span>
        <div className="flex gap-2">
          {page > 0 && (
            <button onClick={onPrev} className="px-4 py-1 border border-white rounded hover:bg-neutral-700 transition">
              {t("prev")}
            </button>
          )}
          {page < totalPages - 1 && (
            <button onClick={onNext} className="px-4 py-1 border border-white rounded hover:bg-neutral-700 transition">
              {t("next")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TitleResultPanel;
