// hooks/useNotificationPrompt.ts
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { BASE_API } from "../constants/api";

export const useNotificationPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const { t } = useTranslation();

  // Actualizar la preferencia del usuario
  const handleToggleNotifications = async (enable: boolean) => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        toast.error(t("error_updating_notification"));
        return;
      }

      const endpoint = enable
        ? `${BASE_API}/user/activate-notification`
        : `${BASE_API}/user/deactivate-notification`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update notification preference");
      }

      toast.success(
        enable ? t("notifications_enabled") : t("notifications_disabled")
      );
      setShowPrompt(false); // Cerrar el modal después de la actualización
    } catch (error) {
      console.error("Error updating notification preference:", error);
      toast.error(t("error_updating_notification"));
    }
  };

  // Verificar si debe mostrar el prompt
  useEffect(() => {
    const checkNotificationPrompt = async () => {
      const token = localStorage.getItem("auth_token");

      if (!token) {
        setShowPrompt(false);
        return;
      }

      try {
        const response = await fetch(`${BASE_API}/user/notification-prompt-status`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          setShowPrompt(false);
          return;
        }

        const data = await response.json();
        setShowPrompt(!data.hasAnsweredNotificationPrompt);
      } catch (error) {
        console.error("Error fetching notification prompt status:", error);
        setShowPrompt(false);
      }
    };

    checkNotificationPrompt();
  }, []);

  return { showPrompt, handleToggleNotifications };
};
