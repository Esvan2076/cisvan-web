import { FaBullhorn } from "react-icons/fa";

const ReportButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-red-400 hover:text-red-600 transition text-lg"
    >
      <FaBullhorn />
    </button>
  );
};

export default ReportButton;
