import Divider from "../atoms/Divider";
import TrendingBox from "../molecules/TrendingBox";
import ScoreBox from "./ScoreBox";
import StreamingPlatformsBox from "./StreamingPlatformsBox";
import UserScoreBox from "./UserScoreBox";

interface Platform {
  nombre: string;
  color: string;
  url: string;
}

interface ContentMetaPanelProps {
  score: number;
  votes: number;
  platforms: Platform[];
  trendingScore?: {
    score: number;
    historicalScore: number;
  };
}

const ContentMetaPanel: React.FC<ContentMetaPanelProps> = ({
  score,
  votes,
  platforms,
  trendingScore,
}) => {
  return (
    <div className="flex flex-row sm:flex-col w-full h-full border-4 border-red-500 rounded-lg p-2">
      <ScoreBox score={score} votes={votes} className="hover:bg-neutral-700" />
      <Divider className="w-full hidden sm:block" />

      <UserScoreBox
        score={7.5}
        hasRated={true}
        ratingDate="12/02/24"
        className="hover:bg-neutral-700"
      />
      <Divider className="w-full hidden sm:block" />

      {/* ✅ Nueva caja de tendencia */}
      {trendingScore && (
        <TrendingBox
          score={trendingScore.score}
          historical={trendingScore.historicalScore}
          className="hover:bg-neutral-700"
        />
      )}

      <Divider className="w-full hidden sm:block" />

      <StreamingPlatformsBox platforms={platforms} />
    </div>
  );
};

export default ContentMetaPanel;
