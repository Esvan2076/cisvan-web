import { useState } from "react";
import { useTranslation } from "react-i18next";
import CommentItem from "../molecules/CommentItem";


interface Item {
  name?: string;
  primaryName?: string;
  score: number;
}

interface Comment {
  id: number;
  commentText: string;
  likeCount: number;
  containsSpoiler: boolean;
  createdAt: string;
  user: {
    id: number;
    username: string;
    profileImageUrl: string;
    currentRank: 2 | 1 | 3 | 4 | 5;
    trendDirection: "U" | "D" | "S";
  };
  likedByMe: boolean;
  replyCount: number;
}

interface ReviewItemProps {
  titleName: string;
  score: number;
  genres: Item[];
  actors: Item[];
  directors: Item[];
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
  comments: Comment[];
}

const ReviewItem: React.FC<ReviewItemProps> = ({
  titleName,
  score,
  genres,
  actors,
  directors,
  currentPage,
  totalPages,
  onNext,
  onPrev,
  comments,
}) => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string>("");

  const categories = [
    { key: "genres", label: t("genres"), items: genres },
    { key: "actors", label: t("actors"), items: actors },
    { key: "directors", label: t("directors"), items: directors },
  ].filter((category) => category.items.length > 0);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
    setSelectedItem("");
  };

  const handleItemChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedItem(event.target.value);
  };

  const getItemName = (item: Item): string => {
    return item.primaryName || item.name || "Unknown";
  };

  return (
    <div className="bg-neutral-800 p-4 rounded-lg text-white mb-4">
      {/* Reseña Header */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">
          {titleName} - {score.toFixed(2)}
        </h3>
        <div className="flex gap-2">
          {/* Categoría */}
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="bg-neutral-700 text-white p-1 rounded"
          >
            <option value="">{t("select_category")}</option>
            {categories.map((category) => (
              <option key={category.key} value={category.key}>
                {category.label}
              </option>
            ))}
          </select>

          {/* Elemento seleccionado */}
          {selectedCategory && (
            <select
              value={selectedItem}
              onChange={handleItemChange}
              className="bg-neutral-700 text-white p-1 rounded"
            >
              <option value="">{t("select_item")}</option>
              {categories
                .find((cat) => cat.key === selectedCategory)
                ?.items.map((item, index) => (
                  <option key={`${getItemName(item)}-${index}`} value={getItemName(item)}>
                    {getItemName(item)} - {item.score}
                  </option>
                ))}
            </select>
          )}

          {/* Paginación */}
          <div className="flex items-center gap-2 ml-4">
            <span className="text-gray-300">
              {t("page")} {currentPage + 1}/{totalPages}
            </span>
            <button
              onClick={onPrev}
              disabled={currentPage === 0}
              className={`px-2 py-1 border rounded ${
                currentPage === 0 ? "border-gray-500 text-gray-500" : "border-white text-white hover:bg-neutral-700"
              }`}
            >
              {t("prev")}
            </button>
            <button
              onClick={onNext}
              disabled={currentPage >= totalPages - 1}
              className={`px-2 py-1 border rounded ${
                currentPage >= totalPages - 1 ? "border-gray-500 text-gray-500" : "border-white text-white hover:bg-neutral-700"
              }`}
            >
              {t("next")}
            </button>
          </div>
        </div>
      </div>

      {/* Comentarios */}
      <div className="mt-4 space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        ) : (
          <p className="text-sm text-gray-400">{t("no_comments")}</p>
        )}
      </div>
    </div>
  );
};

export default ReviewItem;
