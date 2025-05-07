// components/molecules/CommentItem.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Comment } from "../../models/Comment";
import { useComments } from "../../hooks/useComments";
import { useAuth } from "../../hooks/useAuth";
import PrestigeBadge from "./PrestigeBadge";
import ReportButton from "../atoms/ReportButton";

interface Props {
  comment: Comment;
}

const CommentItem: React.FC<Props> = ({ comment }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(comment.likedByMe);
  const [likes, setLikes] = useState(comment.likeCount);
  const [revealed, setRevealed] = useState(!comment.containsSpoiler); // Spoiler control
  const { toggleLike, deleteComment } = useComments();
  const { user } = useAuth();

  const maxLength = 255;
  const isLong = comment.commentText.length > maxLength;
  const textToShow =
    expanded || !isLong
      ? comment.commentText
      : comment.commentText.slice(0, maxLength) + "...";

  const formattedDate = new Date(comment.createdAt).toLocaleDateString();

  const handleToggle = async () => {
    const success = await toggleLike(comment.id);
    if (success) {
      setLiked(!liked);
      setLikes((prev) => prev + (liked ? -1 : 1));
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(t("delete_confirm"));
    if (!confirmed) return;

    const success = await deleteComment(comment.id);
    if (success) {
      window.location.reload();
    }
  };

  const handleReveal = () => {
    setRevealed(true);
  };

  return (
    <div className="bg-neutral-800 rounded-lg p-4 text-white border border-neutral-600 mb-4 select-none">
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-3">
          <img
            src={comment.user.profileImageUrl}
            alt={comment.user.username}
            className="w-10 h-10 rounded object-cover"
          />
          <div>
            <div className="flex items-center gap-2">
              <span
                onClick={() => navigate(`/history/${comment.user.id}`)}
                className="font-semibold cursor-pointer hover:underline"
              >
                {comment.user.username}
              </span>
              <PrestigeBadge
                rank={comment.user.currentRank}
                trend={comment.user.trendDirection}
                size={18}
              />
              <span className="text-sm text-gray-400">— {formattedDate}</span>
            </div>
          </div>
        </div>
        <ReportButton />
      </div>

      {/* Comment Text with Spoiler Handling */}
      <div
        className={`relative text-gray-300 text-sm select-text transition-all duration-300 ${
          comment.containsSpoiler && !revealed
            ? "blur-md cursor-pointer bg-black/50 text-gray-500 rounded p-2 border"
            : ""
        }`}
        onClick={comment.containsSpoiler && !revealed ? handleReveal : undefined}
        title={
          comment.containsSpoiler && !revealed
            ? t("click_to_reveal")
            : undefined
        }
      >
        {comment.containsSpoiler && !revealed ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white font-semibold bg-black/60 p-1 rounded">
              {t("contains_spoiler")}
            </p>
          </div>
        ) : (
          <>
            {textToShow}
            {isLong && (
              <span
                onClick={() => setExpanded(!expanded)}
                className="ml-1 underline text-blue-400 cursor-pointer select-none"
              >
                {expanded ? t("show_less") : t("show_more")}
              </span>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <span className="text-gray-400">👍 {likes}</span>
          <button
            onClick={handleToggle}
            className={`px-2 py-1 border text-xs rounded transition ${
              liked
                ? "border-red-500 text-red-500 hover:bg-red-500 hover:text-black"
                : "border-white text-white hover:bg-white hover:text-black"
            }`}
          >
            {t("like")}
          </button>
          <button className="px-3 py-1 border border-white text-white rounded text-xs font-bold hover:bg-white hover:text-black transition">
            {t("reply")}
          </button>
        </div>

        {/* Delete Button (Admin Only) */}
        {user?.admin && (
          <button
            onClick={handleDelete}
            className="text-xs px-3 py-1 text-white border border-red-500 hover:bg-red-500 hover:text-black rounded"
          >
            {t("delete")}
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
