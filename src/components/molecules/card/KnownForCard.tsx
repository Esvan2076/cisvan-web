import { Link } from "react-router-dom";
import ImageBox from "../../atoms/ImageBox";
import TextAtom from "../../atoms/TextAtom";
import { useTranslation } from "react-i18next";
import { KnownForItem } from "../../../models/person";

interface KnownForCardProps {
  item: KnownForItem;
}

const KnownForCard: React.FC<KnownForCardProps> = ({ item }) => {
  const { t } = useTranslation();

  // Verificación segura para evitar errores
  const averageRating = item.titleRatings?.averageRating !== null ? item.titleRatings?.averageRating?.toFixed(2) : "?";
  const numVotes = item.titleRatings?.numVotes !== null ? item.titleRatings?.numVotes?.toLocaleString() : "0";

  return (
    <li className="bg-neutral-700 rounded-md flex items-center gap-4 h-[120px]">
      <div className="w-[90px] h-[120px] rounded-md overflow-hidden shrink-0">
        <ImageBox
          src={item.posterUrl || "https://cisvan.s3.us-west-1.amazonaws.com/1.jpg"}
          alt={item.primaryTitle}
          className="rounded-md"
        />
      </div>

      <div className="flex flex-col pr-3">
        <Link to={`/content/${item.tconst}`}>
          <TextAtom className="text-white hover:underline text-base" as="p">
            {item.primaryTitle} ({item.startYear})
          </TextAtom>
        </Link>
        <p className="text-xs text-gray-300 mt-1">
          ⭐ {averageRating}/10.00 — {numVotes} {t("votes_suffix")}
        </p>
      </div>
    </li>
  );
};

export default KnownForCard;
