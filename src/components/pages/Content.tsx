import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { useCast } from "../../hooks/useCast";
import { useEpisodesBySeason, useSeriesSummary } from "../../hooks/useEpisode";
import { useContent } from "../../hooks/useContent";

import CastBrowser from "../organisms/CastBrowser";
import SeasonBrowser from "../organisms/seasons/SeasonBrowser";
import ContentBoxes from "../templates/ContentBoxes";
import Header from "../templates/Header";
import ContentStatus from "../organisms/ContentStatus";
import Footer from "../templates/Footer";

const Content: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { contentId } = useParams<{ contentId: string }>();
  const { content, loading, error } = useContent(
    contentId ?? "",
    i18n.language
  );
  const [selectedSeason, setSelectedSeason] = useState(1);

  useEffect(() => {
    if (content?.titleType === "tvEpisode") {
      const match = content.primaryTitle.match(/^(\d+)\./);
      if (match) setSelectedSeason(parseInt(match[1], 10));
    }
  }, [content]);

  const shouldShowSeasons =
    content?.titleType === "tvSeries" || content?.titleType === "tvEpisode";

  const { data: seriesSummary } = useSeriesSummary(
    content?.tconst,
    shouldShowSeasons
  );
  const { episodes } = useEpisodesBySeason(
    seriesSummary?.seriesTconst,
    selectedSeason
  );
  const { cast } = useCast(content?.tconst);

  return (
    <div className="bg-neutral-900 min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8">
        <div className="w-full max-w-7xl mx-auto">
          {!contentId ? (
            <div className="text-red-500 text-center p-4">{t("not_found")}</div>
          ) : (
            <ContentStatus
              loading={loading}
              error={error ?? undefined}
              notFound={!content}
            >
              {content && (
                <>
                  <ContentBoxes content={content} />

                  {shouldShowSeasons && seriesSummary && (
                    <SeasonBrowser
                      seriesTitle={seriesSummary.seriesTitle}
                      seriesId={seriesSummary.seriesTconst}
                      totalSeasons={seriesSummary.totalSeasons}
                      selectedSeason={selectedSeason}
                      onSelectSeason={setSelectedSeason}
                      episodes={episodes}
                      currentEpisodeId={
                        content.titleType === "tvEpisode"
                          ? content.tconst
                          : undefined
                      }
                    />
                  )}

                  {cast.length > 0 && <CastBrowser cast={cast} />}
                </>
              )}
            </ContentStatus>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Content;
