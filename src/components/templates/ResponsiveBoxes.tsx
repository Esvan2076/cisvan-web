import React from "react";
import ImageBox from "../atoms/ImageBox";
import ContentDetails from "../organisms/ContentDetails";
import Ratings from "./Ratings";

interface Content {
  tconst: string;
  titleType: string;
  primaryTitle: string;
  originalTitle: string;
  isAdult: boolean;
  startYear?: number | null;
  endYear?: number | null;
  runtimeMinutes: number;
  genres: string[];
  posterUrl: string;
  ratings: {
    averageRating: number;
    numVotes: number;
  };
  directos: { nconst: string; primaryName: string }[];
  writers: { nconst: string; primaryName: string }[];
  streamingServices?: {
    name: string;
    color: string;
    url: string;
  }[];
}

interface Props {
  content: Content;
}

const ResponsiveBoxes: React.FC<Props> = ({ content }) => {
  return (
    <div className="flex flex-col sm:flex-row w-full h-auto bg-neutral-900 text-white sm:pt-4 pt-10">
      {/* Contenedor que agrupa la imagen y detalles */}
      <div className="flex flex-2 min-h-[250px] max-h-[420px] h-[30vw] bg-neutral-800">
        <div className="flex-1 relative overflow-hidden">
          <ImageBox
            src={content.posterUrl || "https://cisvan.s3.us-west-1.amazonaws.com/1.jpg"}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>

        <div className="flex-2 pl-[10px] pr-[10px] w-full">
          <ContentDetails
            titleType={content.titleType}
            primaryTitle={content.primaryTitle}
            originalTitle={content.originalTitle}
            startYear={content.startYear ?? null}
            endYear={content.endYear ?? null}
            runtimeMinutes={content.runtimeMinutes}
            genres={content.genres}
            directors={content.directos}
            writers={content.writers}
          />
        </div>
      </div>

      {/* Caja Derecha con Ratings */}
      <div className="flex-1 mt-6 sm:mt-0">
        <Ratings
          score={content.ratings?.averageRating ?? 0}
          votes={content.ratings?.numVotes ?? 0}
          platforms={content.streamingServices?.map(service => ({
            nombre: service.name,
            color: service.color,
            url: service.url
          })) ?? []}
        />
      </div>
    </div>
  );
};

export default ResponsiveBoxes;
