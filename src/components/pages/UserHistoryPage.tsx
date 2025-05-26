import ReviewItem from "../organisms/ReviewItem";
import { useUserPaginatedReviews } from "../../hooks/useUserPaginatedReviews"; // nuevo hook
import Footer from "../templates/Footer";
import PrestigeBadge from "../molecules/PrestigeBadge";
import Header from "../templates/Header";
import { useParams } from "react-router-dom";
import { useUserPage } from "../../hooks/useUserPage";
import { useTranslation } from "react-i18next";

import ContentCarousel from "../templates/ContentCarousel";
import { useUserRecommendationsById } from "../../hooks/useUserRecommendationsById";

const UserHistoryPage = () => {
  const { id } = useParams();
  const { userPage, loading, toggleFollow } = useUserPage(Number(id));
  const { t } = useTranslation("profile");
  const { recommendations, loading: loadingRecommendations } = useUserRecommendationsById(Number(id));

  const mapItems = (list: any[]) =>
    list.map((item) => ({
      imageUrl: item.posterUrl,
      title: item.primaryTitle,
      rating: item.averageRating,
      inUserList: item.inUserList,
      tconst: item.tconst,
    }));

  const {
    reviews,
    loading: reviewsLoading,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
  } = useUserPaginatedReviews(Number(id));

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

        {/* Reseñas del usuario */}
        <div className="w-full max-w-4xl mt-10">
          <h3 className="text-2xl font-semibold mb-6">{t("reviews")}</h3>
          {reviewsLoading ? (
            <p className="text-gray-400">{t("loading")}</p>
          ) : reviews?.content.length ? (
            reviews.content.map((r) => (
              <ReviewItem
                key={r.reviewId}
                titleName={r.titleName}
                score={r.score}
                genres={r.genres}
                actors={r.actors}
                directors={r.directors}
                comments={[r.comment]}
                currentPage={currentPage}
                totalPages={totalPages}
                onNext={nextPage}
                onPrev={prevPage}
              />
            ))
          ) : (
            <p className="text-gray-400">{t("no_reviews")}</p>
          )}
        </div>

        {recommendations.length > 0 && (
          <div className="w-full max-w-4xl mt-12">
            <h3 className="text-2xl font-semibold mb-4">{t("recommendations")}</h3>
            {loadingRecommendations ? (
              <p className="text-gray-400">{t("loading")}</p>
            ) : (
              <ContentCarousel items={mapItems(recommendations)} />
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default UserHistoryPage;
