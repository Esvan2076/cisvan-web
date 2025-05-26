import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Props {
  commentText: string;
  primaryTitle: string;
  tconst: string;
  replyToUserId: number | null;
  replyToUsername: string | null;
  user: {
    id: number;
    username: string;
    profileImageUrl: string;
    currentRank: 1 | 2 | 3 | 4 | 5;
    trendDirection: "U" | "D" | "S";
  };
  onBlock: () => void;
  onDelete: () => void;
  onUnreport: () => void;
}

const ReportedCommentItem: React.FC<Props> = ({
  commentText,
  primaryTitle,
  tconst,
  replyToUserId,
  replyToUsername,
  user,
  onBlock,
  onDelete,
  onUnreport,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const maxLength = 255;
  const isLong = commentText.length > maxLength;
  const displayedText =
    expanded || !isLong ? commentText : commentText.slice(0, maxLength) + "...";

  return (
    <div className="bg-neutral-800 border border-neutral-600 rounded-lg p-4 mb-4 w-full select-none">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-white">
          {t("comment_on")}{" "}
          <span
            onClick={() => navigate(`/content/${tconst}`)}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            {primaryTitle}
          </span>
        </h3>
        <div className="flex gap-2">
          <button
            onClick={onUnreport}
            className="px-3 py-1 text-xs border border-white text-white hover:bg-white hover:text-black rounded"
          >
            {t("unreport")}
          </button>
          <button
            onClick={onBlock}
            className="px-3 py-1 text-xs border border-red-500 text-red-500 hover:bg-red-500 hover:text-black rounded"
          >
            {t("block_user")}
          </button>
          <button
            onClick={onDelete}
            className="px-3 py-1 text-xs bg-red-600 text-white hover:bg-red-700 rounded"
          >
            {t("delete")}
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <img
          src={user.profileImageUrl || "/default-actor.jpg"}
          alt={user.username}
          className="w-10 h-10 rounded object-cover"
        />
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              onClick={() => navigate(`/history/${user.id}`)}
              className="text-white font-semibold cursor-pointer hover:underline"
            >
              {user.username}
            </span>
          </div>
          <p className="text-sm text-gray-300 break-words">
            {replyToUsername && (
              <>
                <span
                  onClick={() =>
                    replyToUserId && navigate(`/history/${replyToUserId}`)
                  }
                  className="text-blue-400 cursor-pointer hover:underline mr-1"
                >
                  @{replyToUsername + ":"}
                </span>
              </>
            )}{" "}
            {displayedText}
            {isLong && (
              <span
                onClick={() => setExpanded(!expanded)}
                className="ml-1 underline text-blue-400 cursor-pointer select-none"
              >
                {expanded ? t("show_less") : t("show_more")}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReportedCommentItem;
