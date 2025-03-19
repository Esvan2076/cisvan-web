import { useState, useEffect } from "react";

const API_URL = "http://localhost:8080/title-basics/title/";

interface Content {
  tconst: string;
  titleType: string;
  primaryTitle: string;
  originalTitle: string;
  isAdult: boolean;
  startYear?: number | null;
  endYear?: number | null;
  runtimeMinutes: number;
  genres: string[];
  posterUrl: string;
  ratings: {
    averageRating: number;
    numVotes: number;
  };
  directos: { nconst: string; primaryName: string }[];
  writers: { nconst: string; primaryName: string }[];
}

const useFetchContent = (contentId: string) => {
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`${API_URL}${contentId}`);
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const data = await response.json();
        setContent(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [contentId]);

  return { content, loading, error };
};

export default useFetchContent;
