import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import SeasonButton from "../molecules/SeasonButton";

interface SeasonScrollBarProps {
  seriesTitle: string;
  seriesId: string;
  totalSeasons: number;
  selectedSeason: number;
  onSelectSeason: (season: number) => void;
}

const SeasonScrollBar: React.FC<SeasonScrollBarProps> = ({
  seriesTitle,
  seriesId,
  totalSeasons,
  selectedSeason,
  onSelectSeason,
}) => {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const scrollLeft = () =>
    scrollRef.current?.scrollBy({ left: -150, behavior: "smooth" });

  const scrollRight = () =>
    scrollRef.current?.scrollBy({ left: 150, behavior: "smooth" });

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
          behavior: "smooth",
        });
      }
    }
  }, [selectedSeason]);

  return (
    <div className="flex items-center gap-2 mb-4">
      <p className="text-white font-semibold text-lg whitespace-nowrap select-none">
        <Link to={`/content/${seriesId}`} className="hover:underline">
          {seriesTitle}
        </Link>
        <span className="hidden md:inline"> - {t("season")}s:</span>
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
        className="flex gap-2 overflow-x-auto scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none]"
        style={{ scrollbarWidth: "none" }}
      >
        {Array.from({ length: totalSeasons }, (_, i) => i + 1).map((season, index) => (
          <SeasonButton
            key={season}
            season={season}
            isSelected={selectedSeason === season}
            onClick={() => onSelectSeason(season)}
            ref={(el: HTMLButtonElement | null) => {
              buttonsRef.current[index] = el;
            }}
          />
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
  );
};

export default SeasonScrollBar;
