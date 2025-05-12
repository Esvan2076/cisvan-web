import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { usePersonDetails, useKnownFor } from "../../hooks/usePerson";
import ContentStatus from "../organisms/ContentStatus";
import PersonBoxes from "../templates/PersonBoxes";
import KnownForList from "../organisms/KnownForList";
import PersonWorksPanel from "../organisms/PersonWorksPanel";
import Header from "../templates/Header";
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
            <ContentStatus
              loading={loading}
              error={error ?? undefined}
              notFound={!person}
              loadingMessage={t("loading_person")}
              errorMessage={t("error_loading_person")}
              notFoundMessage={t("person_not_found")}
            >
              {person && (
                <>
                  <PersonBoxes person={person} />
                  <KnownForList knownFor={knownFor} />
                  <div className="mt-6">
                    <h2 className="text-2xl font-semibold mb-2">
                      {t("all_works")}
                    </h2>
                    <PersonWorksPanel nconst={nconst} />
                  </div>
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
