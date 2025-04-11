import { useTranslation } from "react-i18next";
import CastCard from "../molecules/card/CastCard";
import PaginationButton from "../molecules/button/PaginationButton";
import { usePagination } from "../../hooks/shared/usePagination";
import { CastMember } from "../../models/cast";

interface Props {
  cast: CastMember[];
}

const CastBrowser: React.FC<Props> = ({ cast }) => {
  const { t } = useTranslation();
  const uniqueCast = Array.from(
    new Map(cast.map((member) => [member.nconst, member])).values()
  );

  const {
    paginated,
    goToNextPage,
    goToPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = usePagination(uniqueCast, 6);

  return (
    <div className="w-full mt-6 bg-neutral-800 text-white rounded shadow-sm p-4">
      <p className="text-lg font-semibold mb-2 select-none">{t("cast")}</p>

      {cast.length === 0 ? (
        <p className="text-gray-400 text-sm italic select-none">
          {t("no_cast_info")}
        </p>
      ) : (
        <>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-300 mt-2">
            {paginated.map((actor) => (
              <CastCard
                key={`${actor.nconst}-${actor.characters}`}
                nconst={actor.nconst}
                primaryName={actor.primaryName}
                characters={actor.characters}
                imageUrl={actor.imageUrl}
              />
            ))}
          </ul>

          <div className="flex justify-center gap-2 mt-4">
            {hasPreviousPage && (
              <PaginationButton
                label={t("previous")}
                onClick={goToPreviousPage}
              />
            )}
            {hasNextPage && (
              <PaginationButton
                label={t("next")}
                onClick={goToNextPage}
                isPrimary
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CastBrowser;
