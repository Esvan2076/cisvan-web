import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { UserSearchResult } from "../../models/user";
import PrestigeBadge from "../molecules/PrestigeBadge";

interface Props {
  results: UserSearchResult[];
  total: number;
  page: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
}

const UserResultPanel: React.FC<Props> = ({
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
        {results.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-3 cursor-pointer hover:bg-neutral-700 p-3 rounded"
            onClick={() => navigate(`/history/${user.id}`)}
          >
            <img
              src={user.profileImageUrl || "/default-actor.jpg"}
              alt={user.username}
              className="w-10 h-10 rounded object-cover"
            />
            <div className="flex items-center gap-2">
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/history/${user.id}`);
                }}
                className="font-semibold hover:underline"
              >
                {user.username}
              </span>
              <PrestigeBadge
                rank={user.currentRank}
                trend={user.trendDirection}
                size={18}
              />
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

export default UserResultPanel;
