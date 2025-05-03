import ScoreBox from "./ScoreBox";

interface Props {
  score: number;
  votes: number;
}

const PersonPanel: React.FC<Props> = ({ score, votes }) => {
  return (
    <div className="flex flex-row sm:flex-col w-full h-full border-4 border-red-500 rounded-lg p-2">
      <ScoreBox score={score} votes={votes} className="hover:bg-neutral-700" />
    </div>
  );
};

export default PersonPanel;
