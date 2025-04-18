import { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../templates/Header";
import Footer from "../templates/Footer";
import TextAtom from "../atoms/TextAtom";
import AdvancedFilterPanel from "../organisms/AdvancedFilterPanel";
import SearchRightPanel from "../organisms/SearchRightPanel";
import { useTitleSearch, TitleSearchFilters } from "../../hooks/useTitleSearch";

const AdvancedSearch: React.FC = () => {
  const { t } = useTranslation();
  const [currentPayload, setCurrentPayload] = useState<TitleSearchFilters | null>(null);
  const [page, setPage] = useState(0);

  type TabOption = "titles" | "persons" | "users";
  const [activeTab, setActiveTab] = useState<TabOption>("titles");

  const { search, results, total, totalPages, currentPage } = useTitleSearch();

  const handleSearch = (filters: TitleSearchFilters) => {
    setCurrentPayload(filters);
    setPage(0);
    search(filters, 0);
  };

  const handleNext = () => {
    if (!currentPayload) return;
    const nextPage = page + 1;
    setPage(nextPage);
    search(currentPayload, nextPage);
  };

  const handlePrev = () => {
    if (!currentPayload || page === 0) return;
    const prevPage = page - 1;
    setPage(prevPage);
    search(currentPayload, prevPage);
  };

  return (
    <div className="bg-neutral-900 min-h-screen flex flex-col text-white">
      <Header />

      <div className="flex-1 px-2 sm:px-3 md:px-4 lg:px-4 xl:px-4 mt-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-[60%_38%] gap-6">
            {/* IZQUIERDA */}
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

            {/* DERECHA */}
            <SearchRightPanel
              results={results}
              total={total}
              page={page}
              totalPages={totalPages}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};


export default AdvancedSearch;
