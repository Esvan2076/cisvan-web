import { useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import TextAtom from "../atoms/TextAtomProps";

interface SeasonScrollBarProps {
  seriesName: string;
  totalSeasons: number;
  selectedSeason: number;
  onSelectSeason: (season: number) => void;
}

const SeasonScrollBar: React.FC<SeasonScrollBarProps> = ({
  seriesName,
  totalSeasons,
  selectedSeason,
  onSelectSeason,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScrollRight = () => {
    scrollRef.current?.scrollBy({ left: 100, behavior: "smooth" });
  };

  return (
    <div className="w-full bg-neutral-800 p-4 rounded-t-md">
      <div className="flex items-center gap-2">
        <TextAtom className="text-white font-semibold text-lg whitespace-nowrap">
          {seriesName}:
        </TextAtom>

        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide"
        >
          {Array.from({ length: totalSeasons }, (_, i) => i + 1).map((season) => (
            <button
              key={season}
              onClick={() => onSelectSeason(season)}
              className={`min-w-[35px] h-[35px] rounded-full border-2 border-red-600 flex items-center justify-center text-white font-semibold text-sm ${
                selectedSeason === season ? "bg-red-600" : "bg-transparent"
              }`}
            >
              {season}
            </button>
          ))}
        </div>

        <button
          onClick={handleScrollRight}
          className="min-w-[35px] h-[35px] rounded-full border-2 border-red-600 flex items-center justify-center text-white bg-red-600"
        >
          <FaArrowRight />
        </button>
      </div>

      <div className="border-t border-gray-300 mt-2" />
    </div>
  );
};

export default SeasonScrollBar;
