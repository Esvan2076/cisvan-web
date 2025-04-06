import { useTranslation } from "react-i18next";
import { Person } from "../../services/personService";
import TextAtom from "../atoms/TextAtom";
import SplitPanelLayout from "../layouts/SplitPanelLayout";
import PersonPanel from "../organisms/PersonPanel";

interface Props {
  person: Person;
}

const PersonBoxes: React.FC<Props> = ({ person }) => {
  const { t } = useTranslation();

  const renderLifeSpan = () =>
    `${person.birthYear ?? "?"} - ${person.deathYear ?? t("present")}`;

  const hasDates = person.birthYear || person.deathYear;
  const hasProfession = person.primaryProfession?.length > 0;

  return (
    <SplitPanelLayout
      imageUrl={person.imageUrl || "https://cisvan.s3.us-west-1.amazonaws.com/1.jpg"}
      leftContent={
        <div className="lg:pt-4 md:pt-2">
          <TextAtom as="h2" className="text-white text-3xl mb-2">
            {person.primaryName}
          </TextAtom>

          {hasDates && (
            <TextAtom as="p" className="text-gray-300 text-sm mb-2">
              {renderLifeSpan()}
            </TextAtom>
          )}

          {hasProfession && (
            <TextAtom as="p" className="text-gray-300 text-sm mb-4">
              <span className="font-semibold text-white">{t("professions")}:</span>{" "}
              {person.primaryProfession.join(", ")}
            </TextAtom>
          )}
        </div>
      }
      rightContent={<PersonPanel />}
    />
  );
};

export default PersonBoxes;
