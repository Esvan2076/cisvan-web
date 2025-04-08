import { Trans, useTranslation } from "react-i18next";
import Header from "../../templates/Header";
import Footer from "../../templates/Footer";

interface Props {
  sectionKey: string;
}

const LegalPage: React.FC<Props> = ({ sectionKey }) => {
  const { t } = useTranslation("legal");

  return (
    <div className="bg-neutral-900 min-h-screen flex flex-col text-white">
      <Header />

      <main className="flex-1 px-4 py-12">
        <div className="max-w-4xl mx-auto bg-neutral-800 rounded-xl p-6 md:p-10 shadow-md">
          <h1 className="text-3xl font-semibold text-center mb-4 border-b border-white pb-2">
            {t(`${sectionKey}.title`)}
          </h1>
          <div className="whitespace-pre-line text-base leading-relaxed text-gray-300">
            <Trans
              i18nKey={`${sectionKey}.content`}
              t={t}
              components={{ strong: <strong className="text-white font-semibold" /> }}
              ns="legal"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LegalPage;
