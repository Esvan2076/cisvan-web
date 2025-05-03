// hooks/useFollowStats.ts
import { useEffect, useState } from "react";
import { userService } from "../services/userService";
import { UserPreview } from "../models/UserPreview";

export const useFollowStats = (type: "followers" | "following") => {
  const [users, setUsers] = useState<UserPreview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data =
          type === "followers"
            ? await userService.getFollowers()
            : await userService.getFollowing();
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  return { users, loading };
};
