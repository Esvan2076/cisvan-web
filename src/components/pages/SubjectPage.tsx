import { useState, useEffect } from "react";
import Header from "../templates/Header";
import ResponsiveBoxes from "../templates/ResponsiveBoxes";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useFetchContent from "../../hooks/useFetchContent";
import useSeriesSummary from "../../hooks/useSeriesSummary";
import useEpisodesBySeason from "../../hooks/useEpisodesBySeason";
import useCastByContentId from "../../hooks/useCastByContentId";
import SeasonBrowserTemplate from "../templates/SeasonBrowserTemplate";
import CastBrowserOrganism from "../organisms/CastBrowser";

const SubjectPage: React.FC = () => {
  const { t } = useTranslation();
  const { contentId } = useParams<{ contentId: string }>();
  const { content, loading, error } = useFetchContent(contentId ?? "");
  const [selectedSeason, setSelectedSeason] = useState(1);

  const extractSeasonFromTitle = (title: string): number => {
    const match = title.match(/^(\d+)\./);
    return match ? parseInt(match[1], 10) : 1;
  };

  useEffect(() => {
    if (content?.titleType === "tvEpisode") {
      const season = extractSeasonFromTitle(content.primaryTitle);
      setSelectedSeason(season);
    }
  }, [content]);

  const shouldShowSeasons =
    content?.titleType === "tvSeries" || content?.titleType === "tvEpisode";

  const { data: seriesSummary } = useSeriesSummary(content?.tconst, shouldShowSeasons);
  const { episodes } = useEpisodesBySeason(seriesSummary?.seriesTconst, selectedSeason);
  const { cast } = useCastByContentId(content?.tconst);

  if (!contentId) return <div className="text-red-500 text-center p-4">{t("not_found")}</div>;
  if (loading) return <div className="text-white text-center p-4">{t("loading")}</div>;
  if (error) return <div className="text-red-500 text-center p-4">{t("error")}: {error}</div>;
  if (!content) return <div className="text-white text-center p-4">{t("no_data")}</div>;

  return (
    <div className="bg-neutral-900 min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8">
        <div className="w-full max-w-7xl mx-auto">
          <ResponsiveBoxes content={content} />

          {shouldShowSeasons && seriesSummary && (
            <SeasonBrowserTemplate
              seriesName={
                <Link to={`/subject/${seriesSummary.seriesTconst}`} className="hover:underline">
                  {seriesSummary.seriesTitle}
                </Link>
              }
              totalSeasons={seriesSummary.totalSeasons}
              selectedSeason={selectedSeason}
              onSelectSeason={setSelectedSeason}
              episodes={episodes}
            />
          )}

          {cast.length > 0 && <CastBrowserOrganism cast={cast} />}
        </div>
      </div>
    </div>
  );
};

export default SubjectPage;
