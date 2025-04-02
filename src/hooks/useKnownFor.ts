import { useEffect, useState } from "react";
import { getKnownForByPerson, KnownForItem } from "../services/getKnownForByPerson";

const useKnownFor = (nconst?: string) => {
  const [knownFor, setKnownFor] = useState<KnownForItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!nconst) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getKnownForByPerson(nconst);
        setKnownFor(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [nconst]);

  return { knownFor, loading, error };
};

export default useKnownFor;
