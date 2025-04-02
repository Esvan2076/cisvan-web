import { useParams } from "react-router-dom";
import useFetchPerson from "../../hooks/useFetchPerson";
import PersonBoxes from "../templates/PersonBoxes";
import Header from "../templates/Header";

const PersonPage: React.FC = () => {
  const { nconst } = useParams<{ nconst: string }>();
  const { person, loading, error } = useFetchPerson(nconst);

  if (!nconst) return <div className="text-red-500 text-center p-4">ID inválido</div>;
  if (loading) return <div className="text-white text-center p-4">Cargando...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
  if (!person) return <div className="text-white text-center p-4">No encontrado</div>;

  return (
    <div className="bg-neutral-900 min-h-screen text-white flex flex-col">
      <Header />
      <div className="flex-1 px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8">
        <div className="w-full max-w-7xl mx-auto">
          <PersonBoxes person={person} />
        </div>
      </div>
    </div>
  );
};

export default PersonPage;
