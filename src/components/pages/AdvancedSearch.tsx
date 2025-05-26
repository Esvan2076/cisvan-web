import { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../templates/Header";
import Footer from "../templates/Footer";
import TextAtom from "../atoms/TextAtom";
import AdvancedFilterPanel from "../organisms/AdvancedFilterPanel";
import SearchRightPanel from "../organisms/SearchRightPanel";
import { useTitleSearch, TitleSearchFilters } from "../../hooks/useTitleSearch";
import {
  usePersonSearch,
  PersonSearchFilters,
} from "../../hooks/usePersonSearch";
import { useUserSearch } from "../../hooks/useUserSearch";

const AdvancedSearch: React.FC = () => {
  const { t } = useTranslation();
  const [currentPayload, setCurrentPayload] = useState<
    TitleSearchFilters | PersonSearchFilters | { name: string } | null
  >(null);
  const [page, setPage] = useState(0);

  type TabOption = "titles" | "persons" | "users";
  const [activeTab, setActiveTab] = useState<TabOption>("titles");

  const titleSearch = useTitleSearch();
  const personSearch = usePersonSearch();
  const userSearch = useUserSearch();

  const handleSearch = (
    filters: TitleSearchFilters | PersonSearchFilters | { name: string },
    tab: TabOption
  ) => {
    setCurrentPayload(filters);
    setPage(0);
    setActiveTab(tab);

    if (tab === "titles") {
      titleSearch.search(filters as TitleSearchFilters, 0);
    } else if (tab === "persons") {
      personSearch.search(filters as PersonSearchFilters, 0);
    } else if (tab === "users") {
      const username = (filters as any).name || "";
      userSearch.search(username, 0);
    }
  };

  const handleNext = () => {
    if (!currentPayload) return;
    const nextPage = page + 1;
    setPage(nextPage);

    if (activeTab === "titles") {
      titleSearch.search(currentPayload as TitleSearchFilters, nextPage);
    } else if (activeTab === "persons") {
      personSearch.search(currentPayload as PersonSearchFilters, nextPage);
    }
  };

  const handlePrev = () => {
    if (!currentPayload || page === 0) return;
    const prevPage = page - 1;
    setPage(prevPage);

    if (activeTab === "titles") {
      titleSearch.search(currentPayload as TitleSearchFilters, prevPage);
    } else if (activeTab === "persons") {
      personSearch.search(currentPayload as PersonSearchFilters, prevPage);
    }
  };

  return (
    <div className="bg-neutral-900 min-h-screen flex flex-col text-white">
      <Header />

      <div className="flex-1 px-2 sm:px-3 md:px-4 lg:px-4 xl:px-4 mt-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-[60%_38%] gap-6">
            <div className="flex flex-col h-full">
              <div className="mb-6">
                <TextAtom as="h1" className="text-2xl font-bold mb-4">
                  {t("advanced_search.title")}
                </TextAtom>
                <TextAtom
                  as="p"
                  className="text-base leading-relaxed text-gray-300"
                >
                  {t("advanced_search.description")}
                </TextAtom>
              </div>

              <AdvancedFilterPanel
                onSearch={handleSearch}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>

            {activeTab === "titles" && (
              <SearchRightPanel
                results={titleSearch.results}
                total={titleSearch.total}
                page={page}
                totalPages={titleSearch.totalPages}
                onNext={handleNext}
                onPrev={handlePrev}
                type="titles"
              />
            )}

            {activeTab === "persons" && (
              <SearchRightPanel
                results={personSearch.results}
                total={personSearch.total}
                page={page}
                totalPages={personSearch.totalPages}
                onNext={handleNext}
                onPrev={handlePrev}
                type="persons"
              />
            )}

            {activeTab === "users" && (
              <SearchRightPanel
                results={userSearch.results}
                total={userSearch.total}
                page={page}
                totalPages={userSearch.totalPages}
                onNext={handleNext}
                onPrev={handlePrev}
                type="users"
              />
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdvancedSearch;
