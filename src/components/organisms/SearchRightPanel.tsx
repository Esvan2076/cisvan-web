import TitleResultPanel from "../organisms/TitleResultPanel";
import PersonResultPanel from "./PersonResultPanel";

import { TitleSearchResult } from "../../models/content";
import { PersonSearchResult } from "../../models/person";

type Props =
  | {
      results: TitleSearchResult[];
      total: number;
      page: number;
      totalPages: number;
      onNext: () => void;
      onPrev: () => void;
      type: "titles";
    }
  | {
      results: PersonSearchResult[];
      total: number;
      page: number;
      totalPages: number;
      onNext: () => void;
      onPrev: () => void;
      type: "persons";
    };

const SearchRightPanel: React.FC<Props> = (props) => {
  if (props.results.length === 0) return null;

  if (props.type === "titles") {
    const { results, total, page, totalPages, onNext, onPrev } = props;
    return (
      <TitleResultPanel
        results={results}
        total={total}
        page={page}
        totalPages={totalPages}
        onNext={onNext}
        onPrev={onPrev}
      />
    );
  }

  if (props.type === "persons") {
    const { results, total, page, totalPages, onNext, onPrev } = props;
    return (
      <PersonResultPanel
        results={results}
        total={total}
        page={page}
        totalPages={totalPages}
        onNext={onNext}
        onPrev={onPrev}
      />
    );
  }

  return null;
};

export default SearchRightPanel;
