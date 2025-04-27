// components/UserProfile.tsx

import { useEffect } from "react";
import { useTranslation } from "react-i18next"; // 👈 i18n
import { useUserProfile } from "../../hooks/useUserProfile";
import { useNavigate } from "react-router-dom";
import Header from "../templates/Header";
import Footer from "../templates/Footer";
import ProfileImageUploader from "../organisms/ProfileImageUploader";

const UserProfile = () => {
  const { user, loading, refreshUser } = useUserProfile();
  const navigate = useNavigate();
  const { t } = useTranslation("profile"); // 👈 usamos namespace "profile"

  useEffect(() => {
    console.log("Loading:", loading, "User:", user);
  }, [loading, user, navigate]);

  if (loading) {
    return <div className="text-white">{t("loading_profile")}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-900 text-white">
      <Header />

      <main className="flex-1 flex items-start justify-center px-4 mt-10 sm:mt-20 max-[600px]:mt-10">
        <div className="bg-neutral-800 p-6 sm:p-10 rounded-2xl flex flex-col sm:flex-row gap-8 sm:gap-10 items-center sm:items-start max-w-4xl w-full">
          <ProfileImageUploader
            currentImage={user?.profileImageUrl ?? ""}
            onUploaded={() => refreshUser()}
          />

          <div className="flex flex-col gap-2 text-center sm:text-left">
            <p className="text-xl font-semibold">{t("account")}</p>
            <p className="text-lg break-words">{user?.username}</p>
          </div>

          <div className="flex flex-col gap-3 sm:ml-auto w-full sm:w-auto">
            {[1, 2, 3].map((i) => (
              <label
                key={i}
                className="text-white border border-white px-4 py-2 rounded-md flex items-center gap-2 justify-center sm:justify-start"
              >
                <input type="checkbox" />
                {t("notifications")}
              </label>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserProfile;
