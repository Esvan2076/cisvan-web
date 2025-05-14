import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import ModalPortal from "../templates/ModalPortal";

import { toast } from "react-toastify";
import { useReview } from "../../hooks/useReview";

interface RatingModalProps {
  open: boolean;
  onClose: () => void;
  tconst: string;
}

const RatingModal: React.FC<RatingModalProps> = ({ open, onClose, tconst }) => {
  const { t } = useTranslation();
  const { reviewData, submitReview, loading, error } = useReview(tconst, open);
  const [selectedId, setSelectedId] = useState<string>("");
  const [selectedName, setSelectedName] = useState<string>("");
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [starSize, setStarSize] = useState<string>("text-4xl");
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const [text, setText] = useState<string>("");
  const [containsSpoiler, setContainsSpoiler] = useState<boolean>(false);

  useEffect(() => {
    if (reviewData) {
      setSelectedId(reviewData.tconst);
      setSelectedName(reviewData.primaryTitle);
    }
  }, [reviewData]);

  useEffect(() => {
    const updateStarSize = () => {
      if (window.innerWidth < 640) setStarSize("text-3xl");
      else if (window.innerWidth < 1024) setStarSize("text-4xl");
      else setStarSize("text-5xl");
    };
    updateStarSize();
    window.addEventListener("resize", updateStarSize);
    return () => window.removeEventListener("resize", updateStarSize);
  }, []);

  // ✅ Move conditional rendering after all hooks
  if (!open) return null;
  if (loading) return <div className="text-white">{t("loading")}</div>;
  if (error) return <div className="text-red-500">{t("error")}: {error}</div>;

  // Rest of your component logic unchanged...
  const handleSelect = (id: string, name: string) => {
    setSelectedId(id);
    setSelectedName(name);
    setSelectedRating(ratings[id] || 0);
  };

  const handleRatingClick = (rating: number) => {
    setSelectedRating((prev) => (prev === rating ? 0 : rating));
  };

  const handleSubmit = async () => {
    if (!text.trim()) {
      toast.error(t("empty_comment"));
      return;
    }
  
    const movieRating = ratings[reviewData?.tconst || ""];
    if (!movieRating) {
      toast.error(t("rating_required"));
      return;
    }
  
    if (![...text].every((char) => char.charCodeAt(0) <= 255)) {
      toast.error(t("invalid_characters"));
      return;
    }
  
    const filteredGenres =
      reviewData?.genres
        .filter((genre) => ratings[genre] !== undefined)
        .map((genre) => ({ genre, score: ratings[genre] })) || [];
  
    const filteredActors =
      reviewData?.actors
        .filter((actor) => ratings[actor.nconst] !== undefined)
        .map((actor) => ({ nconst: actor.nconst, score: ratings[actor.nconst] })) || [];
  
    const filteredDirectors =
      reviewData?.directors
        .filter((director) => ratings[director.nconst] !== undefined)
        .map((director) => ({ nconst: director.nconst, score: ratings[director.nconst] })) || [];
  
    const reviewJson = {
      tconst: tconst,
      score: movieRating,
      commentText: text,
      containsSpoiler,
      genres: filteredGenres,
      actors: filteredActors,
      directors: filteredDirectors,
    };
  
    try {
      await submitReview(reviewJson);
      toast.success(t("review_submitted"));
      onClose(); // Cerrar el modal después de enviar la reseña exitosamente
    } catch {
      toast.error(t("error_sending_review"));
    }
  };  

  const handleRatingHover = (rating: number) => {
    setHoveredRating(rating);
  };

  const handleRatingLeave = () => {
    setHoveredRating(0);
  };

  const handleRateSubmit = () => {
    setRatings((prev) => ({ ...prev, [selectedId]: selectedRating }));
  };

  const handleClearRating = () => {
    setRatings((prev) => {
      const updatedRatings = { ...prev };
      delete updatedRatings[selectedId];
      return updatedRatings;
    });
    setSelectedRating(0);
  };

  const renderSelectableItem = (id: string, name: string) => {
    const rating = ratings[id];
    const displayText = rating !== undefined ? `${name} - ${rating}` : name;

    return (
      <span
        key={id}
        onClick={() => handleSelect(id, name)}
        className={`cursor-pointer px-3 py-1 rounded ${
          selectedId === id ? "bg-blue-600 text-white" : "text-gray-300"
        }`}
      >
        {displayText}
      </span>
    );
  };

  const renderStar = (index: number) => {
    const isFilled = index <= (hoveredRating || selectedRating);
    return (
      <span
        key={index}
        onClick={() => handleRatingClick(index)}
        onMouseEnter={() => handleRatingHover(index)}
        onMouseLeave={handleRatingLeave}
        className={`cursor-pointer mx-1 ${starSize} ${
          isFilled ? "text-blue-500" : "text-gray-500"
        }`}
      >
        ★
      </span>
    );
  };

  return (
    <ModalPortal>
      {open && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[1000] select-none">
          <div className="relative bg-neutral-800 p-6 rounded-lg w-[800px] max-w-[95vw] mx-4 max-h-[80vh] overflow-y-auto">
            {loading && <div className="text-white">{t("loading")}</div>}
            {error && (
              <div className="text-red-500">
                {t("error")}: {error}
              </div>
            )}
            {!loading && !error && (
              <>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white text-3xl hover:text-red-500"
                >
                  <IoClose />
                </button>
                <h2 className="text-white text-2xl font-semibold mb-6 text-center">
                  {t("rate")} - {reviewData?.primaryTitle}
                </h2>

                {/* Title - Película */}
                <div className="text-white text-xl font-bold mb-2">
                  {reviewData &&
                    renderSelectableItem(
                      reviewData.tconst,
                      reviewData.primaryTitle
                    )}
                </div>

                {/* Genres */}
                <div className="text-white font-semibold mb-1">
                  {t("genres")}:
                </div>
                <div className="flex gap-2 flex-wrap mb-3">
                  {reviewData?.genres.map((genre) =>
                    renderSelectableItem(genre, genre)
                  )}
                </div>

                {/* Directors */}
                <div className="text-white font-semibold mb-1">
                  {t("directors")}:
                </div>
                <div className="flex gap-2 flex-wrap mb-3">
                  {reviewData?.directors.map((director) =>
                    renderSelectableItem(director.nconst, director.primaryName)
                  )}
                </div>

                {/* Actors */}
                <div className="text-white font-semibold mb-1">
                  {t("actors")}:
                </div>
                <div className="flex gap-2 flex-wrap mb-4">
                  {reviewData?.actors.map((actor) =>
                    renderSelectableItem(actor.nconst, actor.primaryName)
                  )}
                </div>

                {/* Rating Section */}
                <div className="bg-neutral-900 p-4 rounded-lg mt-4 text-center">
                  {/* Campo seleccionado y calificación */}
                  <div className="text-white text-lg font-bold mb-2">
                    {selectedName || "CampoSeleccionado"} -{" "}
                    {ratings[selectedId] !== undefined
                      ? ratings[selectedId].toFixed(2)
                      : "N/A"}
                  </div>

                  <div className="flex justify-center mb-6">
                    {Array.from({ length: 10 }, (_, i) => renderStar(i + 1))}
                  </div>
                  <div className="flex justify-center gap-2 mt-4">
                    <button
                      onClick={handleRateSubmit}
                      className="px-4 py-1 bg-blue-600 text-white rounded-md text-sm"
                    >
                      {t("rate")}
                    </button>
                    {ratings.hasOwnProperty(selectedId) && (
                      <button
                        onClick={handleClearRating}
                        className="px-4 py-1 bg-red-600 text-white rounded-md text-sm"
                      >
                        {t("clear_rating")}
                      </button>
                    )}
                  </div>
                </div>

                {/* Nuevo formulario de comentario */}
                <div className="bg-neutral-900 p-4 rounded-lg mt-4 text-center w-full">
                  <textarea
                    className="w-full p-2 rounded bg-neutral-800 text-white text-sm resize-none mb-2"
                    placeholder={t("write_comment")}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={3}
                  />
                  <div className="flex justify-between items-center">
                    <label className="flex items-center gap-2 text-sm text-gray-400">
                      <input
                        type="checkbox"
                        checked={containsSpoiler}
                        onChange={(e) => setContainsSpoiler(e.target.checked)}
                        className="form-checkbox text-red-500"
                      />
                      {t("contains_spoiler")}
                    </label>
                    <button
                      onClick={handleSubmit}
                      className="px-4 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
                    >
                      {t("submit")}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </ModalPortal>
  );
};

export default RatingModal;
