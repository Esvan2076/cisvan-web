import PersonPanel from "../organisms/PersonPanel";
import TextAtom from "../atoms/TextAtom";
import SplitPanelLayout from "../layouts/SplitPanelLayout";
import { Person } from "../../services/getPersonById";

const PersonBoxes: React.FC<{ person: Person }> = ({ person }) => {

  return (
    <SplitPanelLayout
      imageUrl={person.imageUrl || "https://cisvan.s3.us-west-1.amazonaws.com/1.jpg"}
      leftContent={
        <div className="lg:pt-4 md:pt-2">
          <TextAtom as="h2" className="text-white text-3xl mb-2">{person.primaryName}</TextAtom>

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

          {/* knownFor render como antes */}
        </div>
      }
      rightContent={<PersonPanel />}
    />
  );
};

export default PersonBoxes;
