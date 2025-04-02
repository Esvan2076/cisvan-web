import { useState, useEffect } from "react";
import { CastMember, getCastByContentId } from "../services/getCastByContentId";

const useCastByContentId = (contentId?: string) => {
  const [cast, setCast] = useState<CastMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!contentId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getCastByContentId(contentId);
        setCast(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [contentId]);

  return { cast, loading, error };
};

export default useCastByContentId;
