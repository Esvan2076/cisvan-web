import Divider from "../atoms/Divider";
import ScoreBox from "./ScoreBox";
import UserScoreBox from "./UserScoreBox";

interface Props {
  score: number;
  votes: number;
}

const PersonPanel: React.FC<Props> = ({ score, votes }) => {
  return (
    <div className="flex flex-row sm:flex-col w-full h-full border-4 border-red-500 rounded-lg p-2">
      <ScoreBox score={score} votes={votes} className="hover:bg-neutral-700" />
      <Divider className="w-full hidden sm:block" />
      <UserScoreBox
        score={8.7}
        hasRated={true}
        ratingDate="03/04/25"
        className="hover:bg-neutral-700"
      />
      <Divider className="w-full hidden sm:block" />
      <UserScoreBox
        score={8.2}
        hasRated={false}
        className="hover:bg-neutral-700"
      />
    </div>
  );
};

export default PersonPanel;
