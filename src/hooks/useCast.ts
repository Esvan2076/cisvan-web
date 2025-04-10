import { CastMember } from "../models/cast";
import { getCastByContentId } from "../services/castService";
import { useFetch } from "./shared/useFetch";
import { useTranslation } from "react-i18next";

export const useCast = (contentId?: string) => {
  const { t } = useTranslation();
  const { data, loading, error } = useFetch<CastMember[]>(
    () => getCastByContentId(contentId!),
    [contentId],
    !contentId
  );

  return {
    cast: data ?? [],
    loading,
    error: error ? t(error) : null,
  };
};
