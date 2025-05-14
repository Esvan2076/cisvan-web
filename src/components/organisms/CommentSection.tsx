import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useComments } from "../../hooks/useComments";
import { useAuth } from "../../hooks/useAuth";
import CommentItem from "../molecules/CommentItem";
import CommentForm from "../molecules/CommentForm";
import RatingModal from "./RatingModal";
import ReviewItem from "./ReviewItem";
import { usePaginatedReviews } from "../../hooks/usePaginatedReviews";

interface Props {
  contentId: string;
}

const CommentSection: React.FC<Props> = ({ contentId }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { comments, loading, addComment } = useComments(contentId);
  const [showForm, setShowForm] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);

  const {
    reviews,
    loading: reviewLoading,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    reload,
  } = usePaginatedReviews(contentId);

  // Estado para la reseña actual
  const [currentReview, setCurrentReview] = useState<any | null>(null);

  // Actualizar la reseña cuando cambie el contenido o los resultados
  useEffect(() => {
    if (reviews && reviews.content.length > 0) {
      setCurrentReview(reviews.content[0]);
    } else {
      setCurrentReview(null); // Reinicia si no hay reseñas
    }
  }, [reviews, contentId]);

  const handleAddComment = async (text: string, containsSpoiler: boolean) => {
    const success = await addComment(contentId, text, containsSpoiler);
    if (success) {
      setShowForm(false);
      reload(); // Recargar reseñas después de agregar un comentario
    }
  };

  const handleCommentClick = () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    setShowForm(!showForm);
  };

  const handleRateClick = () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    setShowRatingModal(true);
  };

  return (
    <div className="w-full select-none space-y-6">
      {/* Reseña Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-white">{t("reviews")}</h2>
        <button
          className="px-4 py-2 bg-neutral-800 text-white rounded hover:bg-neutral-700 transition"
          onClick={handleRateClick}
        >
          {t("rate")}
        </button>
      </div>

      {reviewLoading ? (
        <p className="text-sm text-gray-400">{t("loading")}</p>
      ) : currentReview ? (
        <ReviewItem
          titleName={currentReview.titleName}
          score={currentReview.score}
          genres={currentReview.genres}
          actors={currentReview.actors}
          directors={currentReview.directors}
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={nextPage}
          onPrev={prevPage}
          comments={[currentReview.comment]}
        />
      ) : (
        <p className="text-sm text-gray-400">{t("no_reviews")}</p>
      )}

      {/* Comentarios Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-white">{t("comments")}</h2>
        <button
          onClick={handleCommentClick}
          className="px-3 py-1 border border-white text-white rounded text-xs font-bold hover:bg-white hover:text-black transition"
        >
          {t("comment")}
        </button>
      </div>

      {showForm && (
        <CommentForm
          onSubmit={handleAddComment}
          onCancel={() => setShowForm(false)}
        />
      )}

      {loading ? (
        <p className="text-sm text-gray-400">{t("loading")}</p>
      ) : !comments || comments.length === 0 ? (
        <p className="text-sm text-gray-400">{t("no_comments")}</p>
      ) : (
        comments.map((c) => <CommentItem key={c.id} comment={c} />)
      )}

      {/* Modal de Calificación */}
      <RatingModal
        open={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        tconst={contentId}
      />
    </div>
  );
};

export default CommentSection;
