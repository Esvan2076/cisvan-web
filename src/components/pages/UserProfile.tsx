import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useUserProfile } from "../../hooks/useUserProfile";
import { useNavigate } from "react-router-dom";
import Header from "../templates/Header";
import Footer from "../templates/Footer";
import ProfileImageUploader from "../organisms/ProfileImageUploader";
import PrestigeBadge from "../molecules/PrestigeBadge";
import { FaEnvelope } from "react-icons/fa";
import FollowStatsModal from "../organisms/FollowStatsModal";
import NotificationBox from "../organisms/NotificationBox";
import { useNotificationPrompt } from "../../hooks/useNotificationPrompt";

const UserProfile = () => {
  const { user, loading, refreshUser } = useUserProfile();
  const navigate = useNavigate();
  const { t } = useTranslation("profile");
  const [showModal, setShowModal] = useState<"followers" | "following" | null>(null);
  const { handleToggleNotifications } = useNotificationPrompt();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [loading, user, navigate]);

  if (loading) {
    return <div className="text-white">{t("loading_profile")}</div>;
  }

  const rank = (user?.userPrestigeDTO?.currentRank ?? 1) as 1 | 2 | 3 | 4 | 5;
  const trend = user?.userPrestigeDTO?.trendDirection ?? "S";

  const toggleNotifications = async () => {
    const newStatus = !user?.emailNotifications;
    await handleToggleNotifications(newStatus);
    refreshUser(); // Actualizar el perfil después de cambiar la preferencia
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-900 text-white select-none">
      <Header />

      <main className="flex-1 flex items-start justify-center px-4 mt-10 sm:mt-20 max-[600px]:mt-10">
        <div className="bg-neutral-800 p-6 sm:p-10 rounded-2xl flex flex-col sm:flex-row gap-6 sm:gap-10 max-w-5xl w-full">
          <div className="flex flex-col items-center gap-3">
            <ProfileImageUploader
              currentImage={user?.profileImageUrl ?? ""}
              onUploaded={() => refreshUser()}
            />
          </div>

          <div className="flex flex-col justify-start gap-2 text-left min-w-[180px]">
            <div>
              <span className="font-bold text-lg">{t("account")}</span>
              <br />
              <span className="text-lg select-text">{user?.username}</span>
            </div>

            <div>
              <button
                onClick={() => setShowModal("following")}
                className="font-bold underline text-blue-300 hover:text-blue-500"
              >
                {t("following")}: {user?.followStats?.followingCount ?? 0}
              </button>
            </div>

            <div>
              <button
                onClick={() => setShowModal("followers")}
                className="font-bold underline text-blue-300 hover:text-blue-500"
              >
                {t("followers")}: {user?.followStats?.followersCount ?? 0}
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-between flex-1 gap-3">
            <div className="flex justify-end items-start gap-2">
              <div className="flex flex-col items-center gap-2">
                <PrestigeBadge rank={rank} trend={trend} size={30} />
                <button
                  onClick={toggleNotifications}
                  className={`text-[30px] ${
                    user?.emailNotifications
                      ? "text-blue-400 hover:text-blue-600"
                      : "text-gray-500 hover:text-gray-600"
                  }`}
                  title={
                    user?.emailNotifications
                      ? t("emails_activated")
                      : t("emails_deactivated")
                  }
                >
                  <FaEnvelope />
                </button>
              </div>

              <NotificationBox />
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <FollowStatsModal
        open={!!showModal}
        onClose={() => setShowModal(null)}
        type={showModal ?? "followers"}
      />
    </div>
  );
};

export default UserProfile;
