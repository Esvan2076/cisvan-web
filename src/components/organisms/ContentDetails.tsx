import React from "react";
import { useTranslation } from "react-i18next";
import TextAtom from "../atoms/TextAtom";
import Divider from "../atoms/Divider";

interface Person {
  nconst: string;
  primaryName: string;
}

interface ContentDetailsProps {
  titleType: string;
  primaryTitle: string;
  originalTitle: string;
  startYear: number | null;
  endYear: number | null;
  runtimeMinutes: number;
  genres: string[];
  directors: Person[] | null;
  writers: Person[] | null;
}

const ContentDetails: React.FC<ContentDetailsProps> = ({
  titleType,
  primaryTitle,
  originalTitle,
  startYear,
  endYear,
  runtimeMinutes,
  genres,
  directors,
  writers,
}) => {
  const { t } = useTranslation(); // Hook para traducción

  return (
    <div className="text-white flex flex-col w-full h-full pt-4">
      {/* Título principal */}
      {primaryTitle && <TextAtom className="text-2xl">{primaryTitle}</TextAtom>}

      {/* Nombre original o serie original para episodios */}
      {originalTitle && (
        <TextAtom className="text-gray-300">
          {t(titleType === "tvEpisode" ? "originalSeries" : "originalTitle")}:{" "}
          {originalTitle}
        </TextAtom>
      )}

      {/* Tipo de título, años y duración */}
      {(titleType || startYear || endYear || runtimeMinutes) && (
        <TextAtom className="text-gray-300">
          {t(`titleType.${titleType}`, titleType)}
          {titleType && (startYear || endYear) && " - "}
          {startYear && `${startYear}`}
          {endYear && ` - ${endYear}`}
          {(startYear || endYear) && runtimeMinutes && " - "}
          {runtimeMinutes && `${runtimeMinutes} ${t("minutes")}`}
        </TextAtom>
      )}

      {/* Géneros */}
      {genres?.length ? (
        <TextAtom className="text-gray-300">
          {t("genres")}: {genres.join(" - ")}
        </TextAtom>
      ) : null}

      {genres?.length && directors?.length ? <Divider /> : null}

      {directors?.length ? (
        <TextAtom className="text-gray-300">
          {t("directors")}: {directors.map((d) => d.primaryName).join(" - ")}
        </TextAtom>
      ) : null}

      {directors?.length && writers?.length ? <Divider /> : null}

      {writers?.length ? (
        <TextAtom className="text-gray-300">
          {t("writers")}: {writers.map((w) => w.primaryName).join(" - ")}
        </TextAtom>
      ) : null}
    </div>
  );
};

export default ContentDetails;
