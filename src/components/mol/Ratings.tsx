import DividerAtom from "../atom/DividerAtom";
import ScoreBox from "../atom/ScoreBox";
import StreamingPlatformsBox from "../atom/StreamingPlatformsBox";
import UserScoreBox from "../atom/UserScoreBox";

interface Platform {
  nombre: string;  // Cambiado de name a nombre
  color: string;
  url: string;
}

interface RatingsProps {
  score: number;
  votes: number;
  platforms: Platform[]; // Ahora es un array de objetos Platform
}

const Ratings: React.FC<RatingsProps> = ({ score, votes, platforms }) => {
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

      {/* ScoreBox 2 - Puntuación del Usuario */}
      <UserScoreBox 
        score={7.50} 
        hasRated={true} 
        ratingDate="12/02/24" 
        className="hover:bg-neutral-700"
      />

      {/* Línea divisoria */}
      <DividerAtom className="w-full hidden sm:block" />

      {/* ScoreBox 3 - Solo visible en pantallas grandes */}
      <div className="hidden lg:block">
        <UserScoreBox 
          score={7.50} 
          hasRated={true} 
          ratingDate="12/02/24" 
          className="hover:bg-neutral-700" 
        />
        {/* Línea divisoria (también oculta cuando ScoreBox 3 desaparece) */}
        <DividerAtom className="w-full hidden sm:block" />
      </div>

      {/* ScoreBox 4 - Plataformas de Streaming */}
      <StreamingPlatformsBox platforms={platforms} />
    </div>
  );
};

export default Ratings;
