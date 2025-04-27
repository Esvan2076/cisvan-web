// hooks/useUserProfile.ts (modificado)
import { useEffect, useState } from "react";
import { UserProfile } from "../models/UserProfile";
import { userService } from "../services/userService";

export const useUserProfile = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const profile = await userService.getProfile(token);
      setUser(profile);
    } catch (err) {
      console.error("Profile error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, refreshUser: fetchUser };
};
