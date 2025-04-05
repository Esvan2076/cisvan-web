const API_URL = `${import.meta.env.VITE_API_URL}/title/basic/`;

export interface Content {
  tconst: string;
  titleType: string;
  primaryTitle: string;
  originalTitle: string;
  isAdult: boolean;
  startYear?: number | null;
  endYear?: number | null;
  runtimeMinutes: number;
  genres: string[];
  posterUrl: string;
  ratings: {
    averageRating: number;
    numVotes: number;
  };
  directos: { nconst: string; primaryName: string }[];
  writers: { nconst: string; primaryName: string }[];
  streamingServices?: StreamingService[];
}

export interface StreamingService {
  id: number;
  name: string;
  color: string;
  url: string;
}

// ✅ Función para obtener contenido desde la API
export const fetchContentById = async (contentId: string): Promise<Content> => {
  const response = await fetch(`${API_URL}${contentId}`);
  if (!response.ok) {
    throw new Error("Error al obtener los datos.");
  }
  const data = await response.json();

  // Retornar contenido con streamingServices como array vacío si no existe
  return {
    ...data,
    streamingServices: data.streamingServices ?? [],
  };
};
