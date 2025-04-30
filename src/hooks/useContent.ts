import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Content } from "../models/content";
import { contentService } from "../services/contentService";

export const useContent = (contentId: string, language: string) => {
  const { t } = useTranslation();
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!contentId) return;

    const fetchContent = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("auth_token");
        const data = await contentService.getById(contentId, language, token ?? undefined);
        setContent(data);
      } catch (err) {
        console.error("Error al cargar el contenido:", err);
        setError(t("error_generic"));
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [contentId, language, t]);

  return {
    content,
    loading,
    error,
  };
};
