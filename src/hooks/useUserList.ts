import { useState, useEffect } from "react";
import { contentService } from "../services/contentService";
import { TopTitle } from "../models/content";

export const useUserList = () => {
  const [userList, setUserList] = useState<TopTitle[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;

    const fetchList = async () => {
      setLoading(true);
      try {
        const data = await contentService.getUserList(token);
        setUserList(data);
      } catch (err) {
        console.error("Error cargando Mi Lista:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchList();
  }, []);

  return { userList, loading };
};
