export interface Episode {
    episodeNumber: number;
    tconst: string;
    primaryTitle: string;
    averageRating: number;
    numVotes: number;
  }

  const API_URL = `${import.meta.env.VITE_API_URL}/title-episodes/series`;
  
  export const getEpisodesBySeason = async (seriesTconst: string, season: number): Promise<Episode[]> => {
    const response = await fetch(`${API_URL}/${seriesTconst}/season/${season}`);
    if (!response.ok) {
      throw new Error("Error al obtener los episodios");
    }
    return response.json();
  };
  