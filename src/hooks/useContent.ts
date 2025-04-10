import { useFetch } from "./shared/useFetch";

import { Content } from "../models/content";
import { useTranslation } from "react-i18next";
import { contentService } from "../services/contentService";

export const useContent = (contentId: string, language: string) => {
  const { t } = useTranslation();
  const { data, loading, error } = useFetch<Content>(
    () => contentService.getById(contentId, language),
    [contentId, language]
  );

  return {
    content: data ?? null,
    loading,
    error: error ? t(error) : null,
  };
};
