import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TextAtom from "../atoms/TextAtom";

interface Person {
  nconst: string;
  primaryName: string;
}

interface Props {
  labelKey: string;
  people: Person[];
}

const PersonList: React.FC<Props> = ({ labelKey, people }) => {
  const { t } = useTranslation();

  return (
    <TextAtom className="select-none">
      {t(labelKey)}:{" "}
      {people.map((person, index) => (
        <span key={person.nconst}>
          <Link to={`/person/${person.nconst}`} className="text-white hover:underline">
            {person.primaryName}
          </Link>
          {index !== people.length - 1 && " - "}
        </span>
      ))}
    </TextAtom>
  );
};

export default PersonList;
