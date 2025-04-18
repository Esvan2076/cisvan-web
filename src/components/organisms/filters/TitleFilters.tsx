import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import FilterToggleButton from "../../molecules/FilterToggleButton";
import FilterBox from "../../molecules/FilterBox";
import { STREAMING_PLATFORMS } from "../../../constants/streamingPlatforms";

interface Props {
  selectedTypes: string[];
  setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
  selectedGenres: string[];
  setSelectedGenres: React.Dispatch<React.SetStateAction<string[]>>;
  selectedPlatforms: string[];
  setSelectedPlatforms: React.Dispatch<React.SetStateAction<string[]>>;
}

const TitleFilters: React.FC<Props> = ({
  selectedTypes,
  setSelectedTypes,
  selectedGenres,
  setSelectedGenres,
  selectedPlatforms,
  setSelectedPlatforms,
}) => {
  const { t } = useTranslation();
  const { t: tType, i18n: i18nTypes } = useTranslation("types");
  const { t: tGenre, i18n: i18nGenres } = useTranslation("genres");

  const [typeKeys, setTypeKeys] = useState<string[]>([]);
  const [genreKeys, setGenreKeys] = useState<string[]>([]);

  useEffect(() => {
    const typesBundle = i18nTypes.getResourceBundle(
      i18nTypes.language,
      "types"
    );
    if (typesBundle) {
      setTypeKeys(Object.keys(typesBundle));
    }

    const genresBundle = i18nGenres.getResourceBundle(
      i18nGenres.language,
      "genres"
    );
    if (genresBundle) {
      setGenreKeys(Object.keys(genresBundle));
    }
  }, [i18nTypes.language, i18nGenres.language, i18nTypes, i18nGenres]);

  const toggle = (
    value: string,
    list: string[],
    setter: (val: string[]) => void
  ) => {
    setter(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
    );
  };

  return (
    <>
      <FilterBox title={t("advanced_search.filters.type")}>
        {typeKeys.map((type) => (
          <FilterToggleButton
            key={type}
            label={tType(type, { defaultValue: type })}
            isSelected={selectedTypes.includes(type)}
            onClick={() => toggle(type, selectedTypes, setSelectedTypes)}
          />
        ))}
      </FilterBox>

      <FilterBox title={t("advanced_search.filters.genres")}>
        {genreKeys.map((genre) => (
          <FilterToggleButton
            key={genre}
            label={tGenre(genre, { defaultValue: genre })}
            isSelected={selectedGenres.includes(genre)}
            onClick={() => toggle(genre, selectedGenres, setSelectedGenres)}
          />
        ))}
      </FilterBox>

      <FilterBox title={t("advanced_search.filters.streaming")}>
        {STREAMING_PLATFORMS.map((platform) => (
          <FilterToggleButton
            key={platform}
            label={platform}
            isSelected={selectedPlatforms.includes(platform)}
            onClick={() =>
              setSelectedPlatforms((prev) =>
                prev.includes(platform) ? [] : [platform]
              )
            }
          />
        ))}
      </FilterBox>
    </>
  );
};

export default TitleFilters;
