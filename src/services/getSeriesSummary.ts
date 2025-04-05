const API_URL = `${import.meta.env.VITE_API_URL}/episode/series/summary`;

export interface SeriesSummary {
  seriesTconst: string;
  seriesTitle: string;
  totalSeasons: number;
}

export const getSeriesSummary = async (tconst: string): Promise<SeriesSummary> => {
  const response = await fetch(`${API_URL}/${tconst}`);
  if (!response.ok) {
    throw new Error("Error al obtener resumen de la serie");
  }
  return response.json();
};
