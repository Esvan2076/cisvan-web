import React from "react";
import { useParams } from "react-router-dom"; // Obtener el ID desde la URL
import { useTranslation } from "react-i18next";
import ImageBox from "../atom/ImageBox";
import ContentDetails from "../mol/ContentDetails";
import Ratings from "../mol/Ratings";
import useFetchContent from "../../hooks/useFetchContent";

const ResponsiveBoxes: React.FC = () => {
  const { t } = useTranslation();
  const { contentId } = useParams<{ contentId: string }>(); // Extraemos `contentId` de la URL

  if (!contentId) {
    return <div className="text-red-500 text-center p-4">{t("not_found")}</div>;
  }

  const { content, loading, error } = useFetchContent(contentId);

  if (loading) {
    return <div className="text-white text-center p-4">{t("loading")}</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{t("error")}: {error}</div>;
  }

  if (!content) {
    return <div className="text-white text-center p-4">{t("no_data")}</div>;
  }

  return (
    <div className="flex flex-col sm:flex-row w-full h-auto bg-neutral-900 text-white sm:pt-4 pt-10">
      {/* Contenedor que agrupa la imagen y detalles */}
      <div className="flex flex-2 min-h-[250px] max-h-[420px] h-[30vw] bg-neutral-800">
        
        {/* Imagen */}
        <div className="flex-1 relative overflow-hidden">
          <ImageBox
            src={content.posterUrl || "https://cisvan.s3.us-west-1.amazonaws.com/1.jpg"}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>

        {/* Caja Central con los detalles del contenido */}
        <div className="flex-2 pl-[10px] pr-[10px] w-full">
          <ContentDetails
            titleType={t(`titleType.${content.titleType}`, content.titleType)}
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
        score={content.ratings.averageRating}
        votes={content.ratings.numVotes}
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
