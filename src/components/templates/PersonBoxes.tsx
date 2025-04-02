import React from "react";
import ImageBox from "../atoms/ImageBox";
import TextAtom from "../atoms/TextAtomProps";
import PersonPanel from "../organisms/PersonPanel";
import useKnownFor from "../../hooks/useKnownFor";

interface Person {
  nconst: string;
  primaryName: string;
  birthYear?: number;
  deathYear?: number;
  primaryProfession: string[];
  knownForTitles: string[];
  imageUrl?: string;
}

interface Props {
  person: Person;
}

const PersonBoxes: React.FC<Props> = ({ person }) => {
  const { knownFor } = useKnownFor(person.nconst);

  return (
    <div className="flex flex-col sm:flex-row w-full h-auto bg-neutral-900 text-white sm:pt-4 pt-10">
      {/* Imagen y detalles */}
      <div className="flex flex-2 min-h-[250px] max-h-[420px] h-[30vw] bg-neutral-800">
        <div className="flex-1 relative overflow-hidden">
          <ImageBox
            src={person.imageUrl || "https://cisvan.s3.us-west-1.amazonaws.com/1.jpg"}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>

        <div className="flex-2 pl-[10px] pr-[10px] w-full lg:pt-4 md:pt-2">
          <TextAtom as="h2" className="text-white text-3xl mb-2">
            {person.primaryName}
          </TextAtom>

          {(person.birthYear || person.deathYear) && (
            <TextAtom as="p" className="text-gray-300 text-sm mb-2">
              {person.birthYear ?? "?"} - {person.deathYear ?? "Actualidad"}
            </TextAtom>
          )}

          {person.primaryProfession.length > 0 && (
            <TextAtom as="p" className="text-gray-300 text-sm mb-4">
              <span className="font-semibold text-white">Profesiones:</span>{" "}
              {person.primaryProfession.join(", ")}
            </TextAtom>
          )}

          {knownFor.length > 0 && (
            <div>
              <TextAtom as="p" className="font-semibold text-white text-sm mb-1">
                Conocido por:
              </TextAtom>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 text-sm text-gray-300">
                {knownFor.map((item) => (
                    <li
                    key={item.tconst}
                    className="bg-neutral-700 rounded-md p-3 flex items-center gap-3"
                    >
                    <img
                        src={item.posterUrl}
                        alt={item.primaryTitle}
                        onError={(e) =>
                        (e.currentTarget.src = "https://cisvan.s3.us-west-1.amazonaws.com/1.jpg")
                        }
                        className="w-[80px] h-[100px] object-cover rounded-md"
                    />

                    <div className="flex flex-col">
                        <TextAtom as="p" className="text-white">
                        <a href={`/subject/${item.tconst}`} className="hover:underline">
                            {item.primaryTitle}
                        </a>
                        </TextAtom>
                        <TextAtom as="p" className="text-gray-400 text-xs">
                        ⭐ {item.ratings.averageRating.toFixed(1)} / 10 —{" "}
                        {item.ratings.numVotes.toLocaleString()} votos
                        </TextAtom>
                        <TextAtom as="p" className="text-gray-400 text-xs">
                        {item.startYear}
                        </TextAtom>
                    </div>
                    </li>
                ))}
                </ul>

            </div>
          )}
        </div>
      </div>

      {/* Panel derecho con contenido falso */}
      <div className="flex-1 mt-6 sm:mt-0">
        <PersonPanel />
      </div>
    </div>
  );
};

export default PersonBoxes;
