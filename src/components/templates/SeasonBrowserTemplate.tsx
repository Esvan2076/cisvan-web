import { useRef, useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Episode } from "../../services/getEpisodesBySeason";
import { Link } from "react-router-dom";

interface SeasonBrowserTemplateProps {
  seriesName: React.ReactNode;
  totalSeasons: number;
  selectedSeason: number;
  onSelectSeason: (season: number) => void;
  episodes: Episode[];
}

const MAX_EPISODES_SHOWN = 9;

const SeasonBrowserTemplate: React.FC<SeasonBrowserTemplateProps> = ({
  seriesName,
  totalSeasons,
  selectedSeason,
  onSelectSeason,
  episodes
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [episodeIndex, setEpisodeIndex] = useState(0);

  const updateArrowVisibility = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
  };

  useEffect(() => {
    updateArrowVisibility();
  }, []);

  useEffect(() => {
    const selectedBtn = buttonsRef.current[selectedSeason - 1];
    if (selectedBtn && scrollRef.current) {
      const container = scrollRef.current;
      const { offsetLeft, offsetWidth } = selectedBtn;
      const { scrollLeft, clientWidth } = container;

      const isVisible =
        offsetLeft >= scrollLeft && offsetLeft + offsetWidth <= scrollLeft + clientWidth;

      if (!isVisible) {
        container.scrollTo({
          left: offsetLeft - clientWidth / 2 + offsetWidth / 2,
          behavior: "smooth"
        });
      }
    }
    setEpisodeIndex(0);
  }, [selectedSeason]);

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -150, behavior: "smooth" });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 150, behavior: "smooth" });

  const paginatedEpisodes = episodes.slice(episodeIndex, episodeIndex + MAX_EPISODES_SHOWN);
  const hasMoreEpisodes = episodeIndex + MAX_EPISODES_SHOWN < episodes.length;
  const hasPrevEpisodes = episodeIndex > 0;

  return (
    <div className="w-full mt-6 bg-neutral-800 text-white rounded shadow-sm p-4">
      <div className="flex items-center gap-2 mb-4">
        <p className="text-white font-semibold text-lg whitespace-nowrap">
          {seriesName}
          <span className="hidden md:inline"> - Temporadas:</span>
        </p>

        {showLeftArrow && (
          <button
            onClick={scrollLeft}
            className="min-w-[35px] h-[35px] rounded-full border-2 border-red-600 flex items-center justify-center text-white bg-red-600"
          >
            <FaArrowLeft />
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={updateArrowVisibility}
          className="flex gap-2 overflow-x-hidden scrollbar-hide pointer-events-none"
        >
          {Array.from({ length: totalSeasons }, (_, i) => i + 1).map((season, index) => (
            <button
              key={season}
              ref={(el: HTMLButtonElement | null) => {
                buttonsRef.current[index] = el;
              }}
              onClick={() => onSelectSeason(season)}
              className={`min-w-[35px] h-[35px] rounded-full border-2 border-red-600 flex items-center justify-center text-white font-semibold text-sm ${
                selectedSeason === season ? "bg-red-600" : "bg-transparent"
              }`}
              style={{ pointerEvents: "auto" }}
            >
              {season}
            </button>
          ))}
        </div>

        {showRightArrow && (
          <button
            onClick={scrollRight}
            className="min-w-[35px] h-[35px] rounded-full border-2 border-red-600 flex items-center justify-center text-white bg-red-600"
          >
            <FaArrowRight />
          </button>
        )}
      </div>

      <div>
        <p className="text-lg font-semibold mb-2">Temporada {selectedSeason}</p>

        {episodes.length === 0 ? (
          <p className="text-gray-400 text-sm italic">No hay episodios disponibles.</p>
        ) : (
          <>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-300 mt-2">
              {paginatedEpisodes.map((ep) => (
                <li key={ep.tconst} className="bg-neutral-700 p-3 rounded-md">
                  <Link
                    to={`/subject/${ep.tconst}`}
                    className="font-semibold text-white hover:underline block"
                  >
                    Ep. {ep.episodeNumber}: {ep.primaryTitle}
                  </Link>
                  <p className="text-xs text-gray-300 mt-1">
                    ⭐ {ep.averageRating != null ? `${ep.averageRating.toFixed(2)}/10.00` : "Sin calificación"} —{" "}
                    {ep.numVotes?.toLocaleString() ?? 0} votos
                  </p>
                </li>
              ))}
            </ul>

            <div className="flex justify-center gap-4 mt-4">
              {hasPrevEpisodes && (
                <button
                  onClick={() =>
                    setEpisodeIndex((prev) => Math.max(0, prev - MAX_EPISODES_SHOWN))
                  }
                  className="px-4 py-2 bg-neutral-600 text-white rounded hover:bg-neutral-700 transition"
                >
                  Ver anteriores
                </button>
              )}

              {hasMoreEpisodes && (
                <button
                  onClick={() => setEpisodeIndex((prev) => prev + MAX_EPISODES_SHOWN)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Ver más episodios
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SeasonBrowserTemplate;
