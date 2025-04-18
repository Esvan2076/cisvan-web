import SearchResultPanel from "../organisms/SearchResultPanel";
import { TitleSearchResult } from "../../models/content";

interface Props {
  results: TitleSearchResult[];
  total: number;
  page: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
}

const SearchRightPanel: React.FC<Props> = ({
  results,
  total,
  page,
  totalPages,
  onNext,
  onPrev,
}) => {
  if (!results.length) return null;

  return (
    <SearchResultPanel
      results={results}
      total={total}
      page={page}
      totalPages={totalPages}
      onNext={onNext}
      onPrev={onPrev}
    />
  );
};

export default SearchRightPanel;
