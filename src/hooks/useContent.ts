import { useFetch } from "./shared/useFetch";
import { getContentById, Content } from "../services/contentService";

export const useContent = (contentId: string, language: string) => {
  const { data, loading, error } = useFetch<Content>(
    () => getContentById(contentId, language),
    [contentId, language]
  );

  return {
    content: data ?? null,
    loading,
    error,
  };
};
