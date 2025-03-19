import Header from "./organism/Header";
import ResponsiveBoxes from "./organism/ResponsiveBoxes";

const SubjectPage: React.FC = () => {
  return (
    <div className="bg-neutral-900 min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Contenido principal con márgenes iguales al Header */}
      <div className="flex-1 px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8">
        <div className="w-full max-w-7xl mx-auto">
          <ResponsiveBoxes />
        </div>
      </div>
    </div>
  );
};

export default SubjectPage;
