import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import ImageBox from "../atoms/ImageBox";
import { useUserListToggle } from "../../hooks/useUserListToggle";
import { useNavigate } from "react-router-dom"; 

interface CardImageFrameProps {
  imageUrl: string;
  isSavedInit: boolean;
  tconst: string;
  className?: string; // ✅ clase opcional para altura
}

const CardImageFrame: React.FC<CardImageFrameProps> = ({
  imageUrl,
  isSavedInit,
  tconst,
  className = "h-full", // 🔥 por defecto altura completa
}) => {
  const navigate = useNavigate();
  const { isSaved, toggleSave } = useUserListToggle(isSavedInit, tconst, navigate);

  return (
    <div className={`relative w-full ${className} bg-gray-300 overflow-hidden`}>
      <ImageBox src={imageUrl} />

      <button
        onClick={toggleSave}
        className="absolute top-1 right-1 transition-all duration-200"
      >
        {isSaved ? (
          <FaBookmark size={28} className="text-red-600 drop-shadow-md hover:drop-shadow-lg" />
        ) : (
          <FaRegBookmark size={28} className="text-red-600 drop-shadow-md hover:drop-shadow-lg" />
        )}
      </button>
    </div>
  );
};

export default CardImageFrame;
