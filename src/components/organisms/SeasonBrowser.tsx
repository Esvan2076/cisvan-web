import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { usePagination } from "../../hooks/shared/usePagination";
import { Episode } from "../../services/episodeService";
import EpisodeCard from "../molecules/EpisodeCard";
import PaginationButton from "../molecules/PaginationButton";
import SeasonScrollBar from "./SeasonScrollBar";

interface SeasonBrowserProps {
  seriesTitle: string;
  seriesId: string;
  totalSeasons: number;
  selectedSeason: number;
  onSelectSeason: (season: number) => void;
  episodes: Episode[];
  currentEpisodeId?: string;
}

const MAX_EPISODES_SHOWN = 9;

const SeasonBrowser: React.FC<SeasonBrowserProps> = ({
  seriesTitle,
  seriesId,
  totalSeasons,
  selectedSeason,
  onSelectSeason,
  episodes,
  currentEpisodeId,
}) => {
  const { t } = useTranslation();

  const {
    paginated: paginatedEpisodes,
    goToNextPage,
    goToPreviousPage,
    hasNextPage,
    hasPreviousPage,
    setPage 
  } = usePagination<Episode>(episodes, MAX_EPISODES_SHOWN);
  
  useEffect(() => {
    if (!currentEpisodeId) return;
    const index = episodes.findIndex((ep) => ep.tconst === currentEpisodeId);
    if (index !== -1) {
      const page = Math.floor(index / MAX_EPISODES_SHOWN);
      setPage(page);
    }
  }, [episodes, currentEpisodeId]);  

  return (
    <div className="w-full mt-6 bg-neutral-800 text-white rounded shadow-sm p-4">
      <SeasonScrollBar
        seriesTitle={seriesTitle}
        seriesId={seriesId}
        totalSeasons={totalSeasons}
        selectedSeason={selectedSeason}
        onSelectSeason={onSelectSeason}
      />

      <div>
        <p className="text-lg font-semibold mb-2 select-none">
          {t("season")} {selectedSeason}
        </p>

        {episodes.length === 0 ? (
          <p className="text-gray-400 text-sm italic select-none">{t("no_episodes")}</p>
        ) : (
          <>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
              {paginatedEpisodes.map((ep) => (
                <EpisodeCard
                  key={ep.tconst}
                  episode={ep}
                  isCurrent={ep.tconst === currentEpisodeId}
                />
              ))}
            </ul>

            <div className="flex justify-center gap-4 mt-4">
              {hasPreviousPage && (
                <PaginationButton label={t("previous")} onClick={goToPreviousPage} />
              )}
              {hasNextPage && (
                <PaginationButton label={t("next")} onClick={goToNextPage} isPrimary />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SeasonBrowser;
