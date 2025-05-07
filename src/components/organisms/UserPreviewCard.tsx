// components/organisms/UserPreviewCard.tsx
import { useNavigate } from "react-router-dom";
import { UserPreview } from "../../models/UserPreview";
import PrestigeBadge from "../molecules/PrestigeBadge";

interface Props {
  user: UserPreview;
}

const UserPreviewCard: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/history/${user.id}`)}
      className="flex items-center justify-between gap-4 px-4 py-2 w-full bg-neutral-900 rounded-md hover:bg-neutral-700 cursor-pointer transition overflow-visible relative"
    >
      <div className="flex items-center gap-3 min-w-0 overflow-hidden">
        <img
          src={user.profileImageUrl}
          alt={user.username}
          className="w-8 h-8 rounded object-cover shrink-0"
        />
        <span className="font-semibold text-white text-sm truncate">
          {user.username}
        </span>
      </div>
      <PrestigeBadge
        rank={user.currentRank}
        trend={user.trendDirection}
        size={18}
      />
    </div>
  );
};

export default UserPreviewCard;
