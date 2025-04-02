import { useEffect, useState } from "react";
import { getPersonById, Person } from "../services/getPersonById";

const useFetchPerson = (nconst?: string) => {
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!nconst) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getPersonById(nconst);
        setPerson(data);
      } catch (err) {
        setError("No se pudo cargar la persona");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [nconst]);

  return { person, loading, error };
};

export default useFetchPerson;
