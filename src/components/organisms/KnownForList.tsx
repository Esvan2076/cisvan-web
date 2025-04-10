import { useTranslation } from "react-i18next";
import KnownForCard from "../molecules/KnownForCard";
import { KnownForItem } from "../../models/person";

interface KnownForListProps {
  knownFor: KnownForItem[];
}

const KnownForList: React.FC<KnownForListProps> = ({ knownFor }) => {
  const { t } = useTranslation();

  if (knownFor.length === 0) return null;

  return (
    <div className="w-full mt-6 bg-neutral-800 text-white rounded shadow-sm p-4">
      <p className="text-lg font-semibold mb-2 select-none">{t("known_for")}:</p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-300 mt-2">
        {knownFor.map((item) => (
          <KnownForCard key={item.tconst} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default KnownForList;
