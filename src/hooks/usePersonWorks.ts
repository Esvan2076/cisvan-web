import { useState, useEffect } from "react";
import { KnownForItem } from "../models/person";
import { personService } from "../services/personService";

export const usePersonWorks = (nconst?: string, page: number = 1) => {
  const [works, setWorks] = useState<KnownForItem[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false); // Nuevo estado de carga

  useEffect(() => {
    const fetchWorks = async () => {
      if (!nconst) return;

      setLoading(true); // Inicia la carga
      setWorks([]); // Limpia los trabajos antes de cargar nuevos resultados

      try {
        const response = await personService.getWorks(nconst, page);
        setWorks(response.content);
        setTotal(response.totalElements);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Error fetching person works:", error);
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    fetchWorks();
  }, [nconst, page]);

  return { works, total, totalPages, loading };
};
