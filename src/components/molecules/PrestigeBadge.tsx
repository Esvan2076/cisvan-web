// components/molecules/PrestigeBadge.tsx
import { useTranslation } from "react-i18next";

interface PrestigeBadgeProps {
  rank: 0 | 1 | 2 | 3 | 4 | 5;
  trend: "U" | "D" | "S";
  size?: number; // tamaño en px opcional
}

const rankIconMap: Record<0 | 1 | 2 | 3 | 4 | 5, string> = {
  0: "🔰",
  1: "🎬",
  2: "🍿",
  3: "🎥",
  4: "🎭",
  5: "🌟",
};

const directionMap = {
  U: { icon: "↑", color: "text-green-400" },
  D: { icon: "↓", color: "text-red-500" },
  S: { icon: "↔", color: "text-gray-400" },
};

const PrestigeBadge: React.FC<PrestigeBadgeProps> = ({
  rank,
  trend,
  size = 32,
}) => {
  const { t } = useTranslation("profile");

  const icon = rankIconMap[rank];
  const label = t(`ranks.${rank}`);
  const trendData = directionMap[trend] ?? directionMap["S"];

  return (
    <div
      className="relative flex flex-col items-center select-none group"
      style={{ fontSize: `${size}px` }}
    >
      <span>{icon}</span>
      <span
        className={`absolute top-0 right-0 ${trendData.color}`}
        style={{ fontSize: `${size * 0.6}px` }}
      >
        {trendData.icon}
      </span>

      {/* Tooltip personalizado */}
      <div className="absolute bottom-full mb-2 px-2 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {label}
      </div>
    </div>
  );
};

export default PrestigeBadge;
