import { forwardRef } from "react";

interface SeasonButtonProps {
  season: number;
  isSelected: boolean;
  onClick: () => void;
}

const SeasonButton = forwardRef<HTMLButtonElement, SeasonButtonProps>(
  ({ season, isSelected, onClick }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={`min-w-[35px] h-[35px] rounded-full border-2 border-red-600 flex items-center justify-center text-white font-semibold text-sm ${
          isSelected ? "bg-red-600" : "bg-transparent"
        } select-none`}
      >
        <span className="select-none">{season}</span>
      </button>
    );
  }
);

export default SeasonButton;
