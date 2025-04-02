import { useState, useEffect } from "react";
import { fetchContentById, Content } from "../services/contentService";

const useFetchContent = (contentId: string) => {
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const getContent = async () => {
      try {
        const data = await fetchContentById(contentId);
        if (isMounted) {
          setContent(data);
        }
      } catch (err) {
        if (isMounted) {
          setError((err as Error).message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getContent();

    return () => {
      isMounted = false; // Evita actualizar el estado si el componente se desmonta
    };
  }, [contentId]);

  return { content, loading, error };
};

export default useFetchContent;
