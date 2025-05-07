// pages/UserHistoryPage.tsx (actualizado)
import { useParams } from "react-router-dom";
import { useUserPage } from "../../hooks/useUserPage";
import PrestigeBadge from "../molecules/PrestigeBadge";
import Footer from "../templates/Footer";
import Header from "../templates/Header";
import { useTranslation } from "react-i18next";

const UserHistoryPage = () => {
  const { id } = useParams();
  const { userPage, loading, toggleFollow } = useUserPage(Number(id));
  const { t } = useTranslation("profile");

  if (loading || !userPage) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center">
        {t("loading_profile")}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col select-none">
      <Header />
      <main className="flex-1 px-4 py-10 flex flex-col items-center">
        <div className="w-full max-w-4xl flex items-center justify-between border-b border-white pb-4">
          <div className="flex items-center gap-4">
            <img
              src={userPage.profileImageUrl}
              alt={userPage.username}
              className="w-12 h-12 rounded object-cover"
            />
            <h2 className="text-xl font-bold">
              {t("history")}:{" "}
              <span className="font-normal">{userPage.username}</span>
            </h2>
          </div>

          {!userPage.mySelf && (
            <div className="flex items-center gap-4">
              <PrestigeBadge
                rank={userPage.currentRank}
                trend={userPage.trendDirection}
                size={28}
              />
              <button
                onClick={toggleFollow}
                className={`px-4 py-1 rounded text-sm font-bold transition 
                ${userPage.following
                  ? "border border-red-500 text-red-500 bg-transparent hover:bg-red-900/20"
                  : "bg-red-500 text-black hover:bg-red-600"}`}
              >
                {userPage.following ? t("unfollow") : t("follow")}
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserHistoryPage;
