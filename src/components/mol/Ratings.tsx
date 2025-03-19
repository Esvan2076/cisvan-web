import DividerAtom from "../atom/DividerAtom";
import ScoreBox from "../atom/ScoreBox";
import UserScoreBox from "../atom/UserScoreBox";

interface RatingsProps {
  score: number;
  votes: number;
}

const Ratings: React.FC<RatingsProps> = ({ score, votes }) => {
  return (
    <div className="flex flex-row sm:flex-col w-full h-full border-4 border-red-500 rounded-lg p-2">
        {/* ScoreBox 1 - Puntuación General */}
        <ScoreBox 
            score={score} 
            votes={votes} 
            className="hover:bg-neutral-700"
        />

        {/* Línea divisoria */}
        <DividerAtom className="w-full hidden sm:block" />

        {/* ScoreBox 2 - Puntuación del Usuario (simulación de usuario ya calificó) */}
        <UserScoreBox 
            score={7.50} 
            hasRated={true} 
            ratingDate="12/02/24" 
            className="hover:bg-neutral-700"
        />

        {/* Línea divisoria */}
        <DividerAtom className="w-full hidden sm:block" />

        {/* ScoreBox 3 - Usuario NO ha calificado */}
        <UserScoreBox 
            hasRated={false} 
            className="hover:bg-neutral-700"
        />
    </div>
  );
};

export default Ratings;
