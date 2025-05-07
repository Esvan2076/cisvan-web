// services/notificationService.ts
import { Notification } from "../models/Notification";
import { BASE_API } from "../constants/api";

export const notificationService = {
  getAll: async (language: string): Promise<Notification[]> => {
    const res = await fetch(`${BASE_API}/notifications`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token") || ""}`,
        "Accept-Language": language,
      },
    });

    if (!res.ok) throw new Error("Error al obtener notificaciones");

    return res.json();
  },
};
