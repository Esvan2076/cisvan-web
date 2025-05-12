import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PaginationButton from "../molecules/button/PaginationButton";
import KnownForCard from "../molecules/card/KnownForCard";
import { usePersonWorks } from "../../hooks/usePersonWorks";

interface Props {
  nconst: string;
}

const PersonWorksPanel: React.FC<Props> = ({ nconst }) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1); 

  const { works, total, totalPages, loading } = usePersonWorks(nconst, page);

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  if (works.length === 0 && !loading) return null;

  return (
    <div className="bg-neutral-800 p-4 rounded shadow-md">
      <h3 className="text-xl font-semibold mb-2">{t("person_works_title")}</h3>
      {loading ? (
        <p className="text-gray-300">{t("loading_works")}</p>
      ) : (
        <>
          <p className="text-gray-300 mb-4">
            {t("total_results")}: {total} - {t("page")} {page}/{totalPages}
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {works.map((item, index) => (
              // Utilizar tconst junto con el índice para evitar duplicados
              <KnownForCard key={`${item.tconst}-${index}`} item={item} />
            ))}
          </ul>
          <div className="flex justify-end gap-2 mt-4">
            <PaginationButton
              label={t("prev")}
              onClick={handlePrev}
              disabled={page <= 1}
            />
            <PaginationButton
              label={t("next")}
              onClick={handleNext}
              disabled={page >= totalPages}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PersonWorksPanel;
