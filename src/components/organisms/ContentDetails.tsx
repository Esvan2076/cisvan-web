import React from "react";
import { useTranslation } from "react-i18next";
import TextAtom from "../atoms/TextAtom";
import Divider from "../atoms/Divider";
import { Link } from "react-router-dom";

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
  const { t } = useTranslation();

  const isSeries = titleType === "tvSeries" || titleType === "tvMiniSeries";
  const writersLabel = isSeries ? t("creators") : t("writers");

  const renderPersonLinks = (people: Person[]) =>
    people.map((person, index) => (
      <React.Fragment key={person.nconst}>
        <Link to={`/person/${person.nconst}`} className="hover:underline text-blue-300">
          {person.primaryName}
        </Link>
        {index < people.length - 1 && " - "}
      </React.Fragment>
    ));

  return (
    <div className="text-white flex flex-col w-full h-full pt-4">
      {primaryTitle && <TextAtom className="text-2xl">{primaryTitle}</TextAtom>}

      {originalTitle && (
        <TextAtom className="text-gray-300">
          {t(titleType === "tvEpisode" ? "originalSeries" : "originalTitle")}: {originalTitle}
        </TextAtom>
      )}

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

      {genres?.length ? (
        <TextAtom className="text-gray-300">
          {t("genres")}: {genres.join(" - ")}
        </TextAtom>
      ) : null}

      {genres?.length && directors?.length ? <Divider /> : null}

      {directors?.length ? (
        <TextAtom className="text-gray-300">
          {t("directors")}: {renderPersonLinks(directors)}
        </TextAtom>
      ) : null}

      {directors?.length && writers?.length ? <Divider /> : null}

      {writers?.length ? (
        <TextAtom className="text-gray-300">
          {writersLabel}: {renderPersonLinks(writers)}
        </TextAtom>
      ) : null}
    </div>
  );
};

export default ContentDetails;
