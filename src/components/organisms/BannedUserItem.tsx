import { useTranslation } from "react-i18next";
import PrestigeBadge from "../molecules/PrestigeBadge";

interface Props {
  id: number;
  username: string;
  profileImageUrl: string;
  currentRank: 1 | 2 | 3 | 4 | 5;
  trendDirection: "U" | "D" | "S";
  onUnban: () => void;
}

const BannedUserItem: React.FC<Props> = ({
  username,
  profileImageUrl,
  currentRank,
  trendDirection,
  onUnban,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between bg-neutral-800 border border-neutral-600 p-3 rounded mb-3">
      <div className="flex items-center gap-3">
        <img
          src={profileImageUrl || "/default-actor.jpg"}
          alt={username}
          className="w-10 h-10 rounded object-cover"
        />
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">{username}</span>
          <PrestigeBadge rank={currentRank} trend={trendDirection} size={18} />
        </div>
      </div>

      <button
        onClick={onUnban}
        className="px-3 py-1 text-xs border border-white text-white hover:bg-white hover:text-black rounded"
      >
        {t("unban")}
      </button>
    </div>
  );
};

export default BannedUserItem;
