import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Comment } from "../../models/Comment";
import { useComments } from "../../hooks/useComments";
import { useAuth } from "../../hooks/useAuth";
import PrestigeBadge from "./PrestigeBadge";
import ReportButton from "../atoms/ReportButton";
import ExpandButton from "../atoms/ExpandButton";
import ReplyItem from "./ReplyItem";
import { useReplies } from "../../hooks/useReplies";
import CommentForm from "./CommentForm";

interface Props {
  comment: Comment;
}

const CommentItem: React.FC<Props> = ({ comment }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(comment.likedByMe);
  const [likes, setLikes] = useState(comment.likeCount);
  const [revealed, setRevealed] = useState(!comment.containsSpoiler);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [activeReplyFormId, setActiveReplyFormId] = useState<number | null>(null);
  const { toggleLike, deleteComment } = useComments();
  const { replies, loading, fetchReplies, addReply } = useReplies(comment.id);
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
      setLiked((prev) => !prev);  // Invertir el estado del like
      setLikes((prev) => prev + (liked ? -1 : 1));  // Actualizar el contador
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

  const handleExpandClick = () => {
    if (!expanded) fetchReplies();
    setExpanded(!expanded);
  };

  const handleReplyClick = () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    setShowReplyForm(!showReplyForm);
  };

  const handleReplySubmit = async (text: string, containsSpoiler: boolean) => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const success = await addReply(comment.id, comment.user.id, text, containsSpoiler);
    if (success) {
      setShowReplyForm(false);
      fetchReplies();
    }
  };

  return (
    <div className="bg-neutral-800 rounded-lg p-4 text-white border border-neutral-600 mb-4 select-none">
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-3">
          <img
            src={comment.user.profileImageUrl || "/default-actor.jpg"}
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

      {/* Comment Text */}
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
        {textToShow}
        {isLong && (
          <span
            onClick={() => setExpanded(!expanded)}
            className="ml-1 underline text-blue-400 cursor-pointer select-none"
          >
            {expanded ? t("show_less") : t("show_more")}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <span className="text-gray-400">👍 {likes}</span>
          <button
            onClick={handleToggle}
            className={`px-2 py-1 h-7 border text-xs rounded transition ${
              liked
                ? "border-red-500 text-red-500 hover:bg-red-500 hover:text-black"
                : "border-white text-white hover:bg-white hover:text-black"
            }`}
          >
            {t("like")}
          </button>
          <button
            onClick={handleReplyClick}
            className="px-3 py-1 h-7 border border-white text-white rounded text-xs font-bold hover:bg-white hover:text-black transition"
          >
            {t("reply")}
          </button>
          {comment.replyCount > 0 && (
            <ExpandButton
              expanded={expanded}
              onClick={handleExpandClick}
              replyCount={comment.replyCount}
            />
          )}
        </div>
        {user?.admin && (
          <button
            onClick={handleDelete}
            className="text-xs px-3 py-1 text-white border border-red-500 hover:bg-red-500 hover:text-black rounded"
          >
            {t("delete")}
          </button>
        )}
      </div>

      {/* Reply Form */}
      {showReplyForm && (
        <div className="mt-2">
          <CommentForm
            onSubmit={handleReplySubmit}
            onCancel={() => setShowReplyForm(false)}
          />
        </div>
      )}

      {/* Reply List */}
      {expanded && (
        <div className="mt-2 bg-neutral-900 border border-neutral-700 rounded p-3 ml-4">
          {loading ? (
            <p className="text-gray-400 text-sm">{t("loading_replies")}</p>
          ) : replies.length === 0 ? (
            <p className="text-gray-400 text-sm">{t("no_replies")}</p>
          ) : (
            replies.map((reply) => (
              <ReplyItem
                key={reply.id}
                reply={reply}
                activeReplyFormId={activeReplyFormId}
                setActiveReplyFormId={setActiveReplyFormId}
                refreshReplyList={fetchReplies}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
