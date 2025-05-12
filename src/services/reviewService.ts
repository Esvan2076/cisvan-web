import { BASE_API } from "../constants/api";

export const reviewService = {
    getReviewData: async (tconst: string) => {
      try {
        const response = await fetch(`${BASE_API}/title/${tconst}/review-data`);
        if (!response.ok) {
          throw new Error("Error al obtener los datos de la reseña");
        }
        return await response.json();
      } catch (error) {
        console.error("Error al obtener los datos de la reseña:", error);
        throw error;
      }
    },
  };
  