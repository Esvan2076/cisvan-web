// src/components/pages/Person.tsx (actualizado)
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { usePersonDetails, useKnownFor } from "../../hooks/usePerson";
import PersonBoxes from "../templates/PersonBoxes";
import Header from "../templates/Header";
import ContentStatus from "../organisms/ContentStatus";
import KnownForList from "../organisms/KnownForList";
import Footer from "../templates/Footer";

const Person: React.FC = () => {
  const { t } = useTranslation();
  const { nconst } = useParams<{ nconst: string }>();
  const { person, loading, error } = usePersonDetails(nconst);
  const { knownFor } = useKnownFor(nconst);

  return (
    <div className="bg-neutral-900 min-h-screen text-white flex flex-col">
      <Header />
      <div className="flex-1 px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8">
        <div className="w-full max-w-7xl mx-auto">
          {!nconst ? (
            <div className="text-red-500 text-center p-4">{t("not_found")}</div>
          ) : (
            <ContentStatus loading={loading} error={error ?? undefined} notFound={!person}>
              {person && (
                <>
                  <PersonBoxes person={person} />
                  <KnownForList knownFor={knownFor} />
                </>
              )}
            </ContentStatus>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Person;
