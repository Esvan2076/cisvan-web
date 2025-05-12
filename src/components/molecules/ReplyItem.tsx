import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Reply } from "../../models/Reply";
import { useAuth } from "../../hooks/useAuth";
import { useComments } from "../../hooks/useComments";
import { useReplies } from "../../hooks/useReplies";
import PrestigeBadge from "./PrestigeBadge";
import ReportButton from "../atoms/ReportButton";
import CommentForm from "./CommentForm";

interface Props {
  reply: Reply;
  activeReplyFormId: number | null;
  setActiveReplyFormId: (id: number | null) => void;
  refreshReplyList: () => void;
}

const ReplyItem: React.FC<Props> = ({ reply, activeReplyFormId, setActiveReplyFormId, refreshReplyList }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toggleLike, deleteComment } = useComments();
  const { addReply } = useReplies(reply.id);
  const [liked, setLiked] = useState(reply.likedByMe);
  const [likes, setLikes] = useState(reply.likeCount);
  const [expanded, setExpanded] = useState(false);
  const [revealed, setRevealed] = useState(!reply.containsSpoiler);

  const maxLength = 150;
  const isLong = reply.commentText.length > maxLength;
  const textToShow =
    expanded || !isLong
      ? reply.commentText
      : reply.commentText.slice(0, maxLength) + "...";

  const formattedDate = new Date(reply.createdAt).toLocaleDateString();

  const handleToggleLike = async () => {
    const success = await toggleLike(reply.id);
    if (success) {
      setLiked(!liked);
      setLikes((prev) => prev + (liked ? -1 : 1));
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(t("delete_confirm"));
    if (!confirmed) return;

    const success = await deleteComment(reply.id);
    if (success) {
      refreshReplyList();
    }
  };

  const handleReplyClick = () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    setActiveReplyFormId(activeReplyFormId === reply.id ? null : reply.id);
  };

  const handleReplySubmit = async (text: string, containsSpoiler: boolean) => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const success = await addReply(reply.id, reply.user.id, text, containsSpoiler);
    if (success) {
      setActiveReplyFormId(null);
      refreshReplyList();
    }
  };

  const handleReveal = () => {
    setRevealed(true);
  };

  return (
    <div className="bg-neutral-700 rounded-lg p-3 text-white border border-neutral-600 mb-2 ml-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-3">
          <img
            src={reply.user.profileImageUrl || "/default-actor.jpg"}
            alt={reply.user.username}
            className="w-8 h-8 rounded object-cover"
          />
          <div>
            <div className="flex items-center gap-2">
              <span
                onClick={() => navigate(`/history/${reply.user.id}`)}
                className="font-semibold cursor-pointer hover:underline"
              >
                {reply.user.username}
              </span>
              <PrestigeBadge
                rank={reply.user.currentRank}
                trend={reply.user.trendDirection}
                size={14}
              />
              <span className="text-sm text-gray-400">— {formattedDate}</span>
            </div>
          </div>
        </div>
        <ReportButton />
      </div>

      {/* Reply Text with Spoiler Handling */}
      <div
        className={`relative text-gray-300 text-sm select-text transition-all duration-300 ${
          reply.containsSpoiler && !revealed
            ? "blur-md cursor-pointer bg-black/50 text-gray-500 rounded p-2 border"
            : ""
        }`}
        onClick={reply.containsSpoiler && !revealed ? handleReveal : undefined}
        title={
          reply.containsSpoiler && !revealed
            ? t("click_to_reveal")
            : undefined
        }
      >
        <span
          onClick={() => navigate(`/history/${reply.replyToUserId}`)}
          className="text-blue-400 cursor-pointer"
        >
          @{reply.replyToUsername}
        </span>
        : {textToShow}
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
      <div className="mt-3 flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <span className="text-gray-400">👍 {likes}</span>
          <button
            onClick={handleToggleLike}
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

      {/* Reply Box */}
      {activeReplyFormId === reply.id && (
        <div className="mt-2">
          <CommentForm
            onSubmit={handleReplySubmit}
            onCancel={() => setActiveReplyFormId(null)}
          />
        </div>
      )}
    </div>
  );
};

export default ReplyItem;
