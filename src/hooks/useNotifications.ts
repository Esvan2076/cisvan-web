// hooks/useNotifications.ts
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Notification } from "../models/Notification";
import { notificationService } from "../services/notificationService";

export const useNotifications = () => {
  const { i18n } = useTranslation();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await notificationService.getAll(i18n.language);
        setNotifications(data);
      } catch (err) {
        console.error("Error cargando notificaciones", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [i18n.language]);

  return { notifications, loading };
};
