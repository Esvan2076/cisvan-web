import { useState } from "react";
import { useReplies } from "../../hooks/useReplies";
import ReplyItem from "./ReplyItem";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface Props {
  commentId: number;
}

const ReplyList: React.FC<Props> = ({ commentId }) => {
  const [expanded, setExpanded] = useState(false);
  const [activeReplyFormId, setActiveReplyFormId] = useState<number | null>(null);
  const { replies, loading, fetchReplies } = useReplies(commentId);

  const handleToggle = () => {
    if (!expanded) fetchReplies();
    setExpanded(!expanded);
  };

  return (
    <div>
      <button
        onClick={handleToggle}
        className="text-xs px-3 py-1 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition flex items-center gap-1"
      >
        {expanded ? "Ocultar respuestas" : "Ver respuestas"}
        {expanded ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {expanded && (
        <div className="mt-2 bg-neutral-900 border border-neutral-700 rounded p-3 ml-4">
          {loading ? (
            <p className="text-gray-400 text-sm">Cargando respuestas...</p>
          ) : replies.length === 0 ? (
            <p className="text-gray-400 text-sm">No hay respuestas.</p>
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

export default ReplyList;
