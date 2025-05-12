import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface Props {
  expanded: boolean;
  onClick: () => void;
  replyCount: number;
}

const ExpandButton: React.FC<Props> = ({ expanded, onClick, replyCount }) => {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1 h-7 border border-blue-400 text-blue-400 rounded text-xs font-bold flex items-center gap-1 hover:bg-blue-400 hover:text-black transition"
    >
      {expanded ? <FaChevronUp /> : <FaChevronDown />}
      {expanded ? "Ocultar respuestas" : `Ver respuestas (${replyCount})`}
    </button>
  );
};

export default ExpandButton;
