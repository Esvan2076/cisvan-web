import { Content } from "../../models/content";
import SplitPanelLayout from "./layouts/SplitPanelLayout";
import ContentDetails from "../organisms/ContentDetails";
import Ratings from "./Ratings";
import CardImageFrame from "../molecules/CardImageFrame";

const ContentBoxes: React.FC<{ content: Content }> = ({ content }) => {
  return (
    <SplitPanelLayout
      imageComponent={
        <CardImageFrame
          imageUrl={content.posterUrl || "https://cisvan.s3.us-west-1.amazonaws.com/1.jpg"}
          isSavedInit={content.inUserList}
          tconst={content.tconst}
        />
      }
      leftContent={
        <ContentDetails
          titleType={content.titleType}
          primaryTitle={content.primaryTitle}
          originalTitle={content.originalTitle}
          startYear={content.startYear ?? null}
          endYear={content.endYear ?? null}
          runtimeMinutes={content.runtimeMinutes}
          genres={content.genres}
          directors={content.directors}
          writers={content.writers}
        />
      }
      rightContent={
        <Ratings
          score={content.titleRatings?.averageRating ?? 0}
          votes={content.titleRatings?.numVotes ?? 0}
          platforms={
            content.streamingServices?.map((s) => ({
              nombre: s.name,
              color: s.color,
              url: s.url,
            })) ?? []
          }
        />
      }
    />
  );
};

export default ContentBoxes;
