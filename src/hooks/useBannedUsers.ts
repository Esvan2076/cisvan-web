import { useCallback } from "react";
import { useFetch } from "./shared/useFetch";

import { userService } from "../services/userService";
import { UserSearchResult } from "../models/user";

export const useBannedUsers = () => {
  const {
    data: bannedUsers,
    loading,
    error,
    refresh,
  } = useFetch<UserSearchResult[]>(() => userService.getBannedUsers(), [], false);

  const unbanUser = useCallback(async (userId: number) => {
    try {
      await userService.toggleBan(userId);
      refresh();
    } catch (err) {
      console.error("Error unbanning user:", err);
    }
  }, [refresh]);

  return { bannedUsers, loading, error, refresh, unbanUser };
};
