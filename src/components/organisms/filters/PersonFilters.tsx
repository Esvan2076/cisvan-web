import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import FilterToggleButton from "../../molecules/FilterToggleButton";
import FilterBox from "../../molecules/FilterBox";

interface Props {
  selectedProfessions: string[];
  setSelectedProfessions: React.Dispatch<React.SetStateAction<string[]>>;
}

const PersonFilters: React.FC<Props> = ({
  selectedProfessions,
  setSelectedProfessions,
}) => {
  const { t } = useTranslation();
  const { t: tProf, i18n } = useTranslation("professions");

  const [professionKeys, setProfessionKeys] = useState<string[]>([]);

  useEffect(() => {
    const bundle = i18n.getResourceBundle(i18n.language, "professions");
    if (bundle) {
      setProfessionKeys(Object.keys(bundle));
    }
  }, [i18n.language, i18n]);

  const toggleProfession = (profession: string) => {
    setSelectedProfessions((prev) =>
      prev.includes(profession)
        ? prev.filter((p) => p !== profession)
        : [...prev, profession]
    );
  };

  return (
    <>
      <FilterBox title={t("advanced_search.filters.professions")}>
        {professionKeys.map((profession) => (
          <FilterToggleButton
            key={profession}
            label={tProf(profession, { defaultValue: profession })}
            isSelected={selectedProfessions.includes(profession)}
            onClick={() => toggleProfession(profession)}
          />
        ))}
      </FilterBox>
    </>
  );
};

export default PersonFilters;
