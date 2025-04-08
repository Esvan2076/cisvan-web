import { useFetch } from "./shared/useFetch";
import { getContentById } from "../services/contentService";
import { Content } from "../models/content";
import { useTranslation } from "react-i18next";

export const useContent = (contentId: string, language: string) => {
  const { t } = useTranslation();
  const { data, loading, error } = useFetch<Content>(
    () => getContentById(contentId, language),
    [contentId, language]
  );

  return {
    content: data ?? null,
    loading,
    error: error ? t(error) : null,
  };
};
