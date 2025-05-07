// services/recommendationService.ts
import { Recommendation } from "../models/Recommendation";
import { BASE_API } from "../constants/api";

export const recommendationService = {
  getByContentId: async (tconst: string): Promise<Recommendation[]> => {
    const res = await fetch(`${BASE_API}/recommendations/${tconst}`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("No se pudieron cargar recomendaciones");
    }

    return res.json();
  },
};
