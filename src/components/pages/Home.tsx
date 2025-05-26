// components/pages/Home.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import Header from "../templates/Header";
import Footer from "../templates/Footer";
import ContentCarousel from "../templates/ContentCarousel";

import { useTopContent } from "../../hooks/useTopContent";
import { useUserList } from "../../hooks/useUserList";
import { useNotificationPrompt } from "../../hooks/useNotificationPrompt";
import { useUserRecommendations } from "../../hooks/useUserRecommendations";
import NotificationPreferenceModal from "../organisms/NotificationPreferenceModal";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const { movies, series, trending, loading } = useTopContent();
  const { userList, loading: loadingUserList } = useUserList();
  const { showPrompt, handleToggleNotifications } = useNotificationPrompt();
  const { recommendations, loading: loadingRecommendations } =
    useUserRecommendations();

  const mapItems = (list: any[]) =>
    list.map((item) => ({
      imageUrl: item.posterUrl,
      title: item.primaryTitle,
      rating: item.averageRating,
      inUserList: item.inUserList,
      tconst: item.tconst,
    }));

  return (
    <div className="bg-neutral-900 min-h-screen w-full flex flex-col">
      <Header />

      {showPrompt && (
        <NotificationPreferenceModal
          onClose={() => handleToggleNotifications(false)}
          onConfirm={() => handleToggleNotifications(true)}
        />
      )}

      <main className="flex-1 text-white flex flex-col gap-24 px-2 sm:px-3 md:px-4 lg:px-4 xl:px-4">
        <div className="w-full max-w-7xl mx-auto flex flex-col pt-12">
          <section className="relative pb-10">
            <h2 className="text-3xl font-bold mb-2 select-none">
              {t("trending")}
            </h2>
            {loading ? (
              <div className="flex justify-center py-10 text-lg select-none">
                {t("loading")}
              </div>
            ) : (
              <ContentCarousel items={mapItems(trending)} />
            )}
          </section>

          {userList.length > 0 && (
            <section className="relative pb-10">
              <h2 className="text-3xl font-bold mb-2 select-none">
                {t("my_list")}
              </h2>
              {loadingUserList ? (
                <div className="flex justify-center py-10 text-lg select-none">
                  {t("loading")}
                </div>
              ) : (
                <ContentCarousel items={mapItems(userList)} />
              )}
            </section>
          )}

          <section className="relative pb-10">
            <h2 className="text-3xl font-bold mb-2 select-none">
              {t("top_series")}
            </h2>
            {loading ? (
              <div className="flex justify-center py-10 text-lg select-none">
                {t("loading")}
              </div>
            ) : (
              <ContentCarousel items={mapItems(series)} />
            )}
          </section>

          <section className="relative pb-10">
            <h2 className="text-3xl font-bold mb-2 select-none">
              {t("top_movies")}
            </h2>
            {loading ? (
              <div className="flex justify-center py-10 text-lg select-none">
                {t("loading")}
              </div>
            ) : (
              <ContentCarousel items={mapItems(movies)} />
            )}
          </section>

          {recommendations.length > 0 && (
            <section className="relative pb-10">
              <h2 className="text-3xl font-bold mb-2 select-none">
                {t("recommendations")}
              </h2>
              {loadingRecommendations ? (
                <div className="flex justify-center py-10 text-lg select-none">
                  {t("loading")}
                </div>
              ) : (
                <ContentCarousel items={mapItems(recommendations)} />
              )}
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
