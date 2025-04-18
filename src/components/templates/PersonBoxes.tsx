import { useTranslation } from "react-i18next";
import TextAtom from "../atoms/TextAtom";
import SplitPanelLayout from "./layouts/SplitPanelLayout";
import PersonPanel from "../organisms/PersonPanel";
import { Person } from "../../models/person";

interface Props {
  person: Person;
}

const PersonBoxes: React.FC<Props> = ({ person }) => {
  const { t } = useTranslation();
  const { t: tProf } = useTranslation("professions");

  const renderLifeSpan = () =>
    `${person.birthYear ?? "?"} - ${person.deathYear ?? t("present")}`;

  const hasDates = person.birthYear || person.deathYear;
  const hasProfession = person.primaryProfession?.length > 0;

  const translatedProfessions = person.primaryProfession
    .map((p) => tProf(p, { defaultValue: p }))
    .join(", ");

  const hasRating = person.nameRatings?.averageRating !== undefined;

  return (
    <SplitPanelLayout
      imageUrl={
        person.imageUrl || "https://cisvan.s3.us-west-1.amazonaws.com/1.jpg"
      }
      leftContent={
        <div className="pt-4">
          <TextAtom as="h2" className="text-white text-3xl mb-2">
            {person.primaryName}
          </TextAtom>

          {hasDates && (
            <TextAtom as="p" className="text-gray-300 text-sm mb-2">
              {renderLifeSpan()}
            </TextAtom>
          )}

          {hasProfession && (
            <TextAtom as="p" className="text-gray-300 text-sm mb-2">
              <span className="font-semibold text-gray-300">
                {t("professions")}:
              </span>{" "}
              {translatedProfessions}
            </TextAtom>
          )}
        </div>
      }
      rightContent={
        hasRating ? (
          <PersonPanel
            score={person.nameRatings!.averageRating}
            votes={person.nameRatings!.numVotes}
          />
        ) : null
      }      
    />
  );
};

export default PersonBoxes;
