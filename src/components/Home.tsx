import Header from "./organism/Header";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
  const { t } = useTranslation(); // Hook para traducción

  return (
    <div className="bg-neutral-900 min-h-screen w-full flex flex-col">
      {/* Header */}
      <Header />

      {/* Contenido principal */}
      <main className="flex-1 flex flex-col items-center justify-center text-white p-6">
        <h1 className="text-3xl font-bold">{t("welcomeMessage")}</h1>
        <p className="text-lg mt-2">{t("welcomeDescription")}</p>
      </main>
    </div>
  );
};

export default Home;
