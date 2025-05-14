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

    submitReview: async (reviewJson: any, token: string) => {
      try {
        const response = await fetch(`${BASE_API}/reviews/submit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(reviewJson),
        });
  
        if (!response.ok) {
          throw new Error("Error al enviar la reseña");
        }
  
        return await response.json();
      } catch (error) {
        console.error("Error al enviar la reseña:", error);
        throw error;
      }
    },

      // Nuevo método: Obtener reseñas paginadas
    getPaginatedReviews: async (
      tconst: string,
      page: number,
      token?: string
    ) => {
      try {
        const response = await fetch(
          `${BASE_API}/reviews/paginated?tconst=${tconst}&page=${page}`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener reseñas paginadas");
        }

        return await response.json();
      } catch (error) {
        console.error("Error al obtener reseñas paginadas:", error);
        throw error;
      }
    },
  };
  