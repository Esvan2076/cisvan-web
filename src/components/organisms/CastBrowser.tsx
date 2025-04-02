import { useState } from "react";
import { CastMember } from "../../services/getCastByContentId";
import TextAtom from "../atoms/TextAtomProps";
import { Link } from "react-router-dom";

interface Props {
  cast: CastMember[];
}

const MAX_CAST_PER_PAGE = 6;

const CastBrowser: React.FC<Props> = ({ cast }) => {
  const [index, setIndex] = useState(0);

  const uniqueCast = Array.from(new Map(cast.map(member => [member.nconst, member])).values());
  const paginated = uniqueCast.slice(index, index + MAX_CAST_PER_PAGE);

  const hasNext = index + MAX_CAST_PER_PAGE < uniqueCast.length;
  const hasPrev = index > 0;

  return (
    <div className="w-full mt-6 bg-neutral-800 text-white rounded shadow-sm p-4">
      <p className="text-lg font-semibold mb-2">Reparto</p>

      {cast.length === 0 ? (
        <p className="text-gray-400 text-sm italic">No hay información del reparto disponible.</p>
      ) : (
        <>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-300 mt-2">
            {paginated.map((actor) => (
              <li
                key={actor.nconst}
                className="bg-neutral-700 rounded-md flex items-center gap-3"
              >
                <img
                  src={actor.imageUrl}
                  alt={actor.primaryName}
                  onError={(e) => (e.currentTarget.src = "https://cisvan.s3.us-west-1.amazonaws.com/1.jpg")}
                  className="w-[80px] h-[100px] object-cover rounded-md"
                />

                <div className="flex flex-col">
                  <Link to={`/person/${actor.nconst}`}>
                    <TextAtom className="text-white hover:underline" as="p">
                      {actor.primaryName}
                    </TextAtom>
                  </Link>
                  <p className="text-xs text-gray-300">{actor.characters}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-center gap-2 mt-4">
            {hasPrev && (
              <button
                onClick={() => setIndex((prev) => prev - MAX_CAST_PER_PAGE)}
                className="px-4 py-2 bg-neutral-600 text-white rounded hover:bg-neutral-700 transition"
              >
                Anterior
              </button>
            )}

            {hasNext && (
              <button
                onClick={() => setIndex((prev) => prev + MAX_CAST_PER_PAGE)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Siguiente
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CastBrowser;
