// components/organisms/FollowStatsModal.tsx
import { IoClose } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import ModalPortal from "../templates/ModalPortal";
import { useFollowStats } from "../../hooks/useFollowStats";
import UserPreviewCard from "./UserPreviewCard";

interface FollowStatsModalProps {
  open: boolean;
  onClose: () => void;
  type: "followers" | "following";
}

const FollowStatsModal: React.FC<FollowStatsModalProps> = ({
  open,
  onClose,
  type,
}) => {
  const { t } = useTranslation("profile");
  const { users, loading } = useFollowStats(type);

  if (!open) return null;

  return (
    <ModalPortal>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[1000] select-none">
        <div className="relative bg-neutral-800 p-6 rounded-lg w-full max-w-md max-w-[95vw] mx-4 max-h-[80vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white text-3xl hover:text-red-500 transition-colors"
          >
            <IoClose />
          </button>
          <h2 className="text-white text-2xl font-semibold mb-6 text-center">
            {t(type)}
          </h2>
          {loading ? (
            <p className="text-center text-gray-300">{t("loading")}</p>
          ) : users.length === 0 ? (
            <p className="text-center text-gray-300">{t("no_results")}</p>
          ) : (
            <div className="flex flex-col gap-2 w-full">
              {users.map((user) => (
                <UserPreviewCard key={user.id} user={user} />
              ))}
            </div>
          )}
        </div>
      </div>
    </ModalPortal>
  );
};

export default FollowStatsModal;
