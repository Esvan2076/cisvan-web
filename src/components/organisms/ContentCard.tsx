import CardImageFrame from "../molecules/CardImageFrame";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

interface ContentCardProps {
  imageUrl: string;
  title: string;
  rating: number;
  inUserList: boolean;
  tconst: string;
}

const ContentCard: React.FC<ContentCardProps> = ({ imageUrl, title, rating, inUserList, tconst }) => {
  return (
    <div className="flex-shrink-0 w-48 bg-neutral-800 overflow-hidden shadow-md rounded-b-lg">
      <CardImageFrame 
        imageUrl={imageUrl} 
        isSavedInit={inUserList} 
        tconst={tconst}
        className="h-[280px]"
      />

      <div className="bg-black w-full p-3 text-center">
        <Link to={`/content/${tconst}`} className="block font-bold text-sm truncate hover:underline">
          {title}
        </Link>
        <div className="flex items-center justify-center mt-2">
          <FaStar className="text-yellow-400 mr-1" />
          <span className="text-sm">{rating.toFixed(2)}/10.00</span>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
