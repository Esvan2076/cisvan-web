import { useFetch } from "./shared/useFetch";
import { getContentById, Content } from "../services/contentService";
import { useTranslation } from "react-i18next";

export const useContent = (contentId: string) => {
  const { t } = useTranslation();
  const { data, loading, error } = useFetch<Content>(
    () => getContentById(contentId),
    [contentId]
  );

  return {
    content: data ?? null,
    loading,
    error: error ? t(error) : null,
  };
};
