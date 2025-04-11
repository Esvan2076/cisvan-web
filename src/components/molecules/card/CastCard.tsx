import { Link } from "react-router-dom";
import TextAtom from "../../atoms/TextAtom";
import ImageBox from "../../atoms/ImageBox";

interface CastCardProps {
  nconst: string;
  primaryName: string;
  characters: string;
  imageUrl?: string;
}

const CastCard: React.FC<CastCardProps> = ({
  nconst,
  primaryName,
  characters,
  imageUrl,
}) => {
  return (
    <li className="bg-neutral-700 rounded-md flex items-center gap-3">
      <div className="w-[80px] h-[100px] rounded-md overflow-hidden">
        <ImageBox
          src={imageUrl || "https://cisvan.s3.us-west-1.amazonaws.com/1.jpg"}
          alt={primaryName}
          className="rounded-md"
        />
      </div>

      <div className="flex flex-col">
        <Link to={`/person/${nconst}`}>
          <TextAtom className="text-white hover:underline" as="p">
            {primaryName}
          </TextAtom>
        </Link>
        <p className="text-xs text-gray-300">{characters}</p>
      </div>
    </li>
  );
};

export default CastCard;
