export interface KnownForItem {
    tconst: string;
    titleType: string;
    primaryTitle: string;
    startYear: number;
    posterUrl: string; // <--- agregada
    ratings: {
      tconst: string;
      averageRating: number;
      numVotes: number;
    };
  }
  
  const API_URL = `${import.meta.env.VITE_API_URL}/name-basics`;
  
  export const getKnownForByPerson = async (
    nconst: string
  ): Promise<KnownForItem[]> => {
    const res = await fetch(`${API_URL}/${nconst}/known-for`);
    if (!res.ok) throw new Error("Error al obtener películas destacadas");
    return res.json();
  };
  