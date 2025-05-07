// hooks/useUserPage.ts
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../services/userService";
import { UserPage } from "../models/UserPage";

export const useUserPage = (userId: number) => {
    const navigate = useNavigate();
    const [userPage, setUserPage] = useState<UserPage | null>(null);
    const [loading, setLoading] = useState(true);
  
    const loadUserPage = async () => {
      try {
        const data = await userService.getUserPage(userId);
        setUserPage(data);
      } catch {
        navigate("/auth");
      } finally {
        setLoading(false);
      }
    };
  
    const toggleFollow = useCallback(async () => {
      try {
        await userService.toggleFollow(userId);
        setUserPage((prev) =>
          prev ? { ...prev, following: !prev.following } : prev
        );
      } catch (e) {
        console.error("Error al seguir/dejar de seguir");
      }
    }, [userId]);
  
    useEffect(() => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        navigate("/auth");
        return;
      }
      loadUserPage();
    }, [userId, navigate]);
  
    return { userPage, loading, toggleFollow };
  };