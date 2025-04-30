import { useState } from "react";
import { contentService } from "../services/contentService";
import { NavigateFunction } from "react-router-dom";

export const useUserListToggle = (initialSaved: boolean, tconst: string, navigate: NavigateFunction) => {
  const [isSaved, setIsSaved] = useState(initialSaved);

  const toggleSave = async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      navigate("/auth");
      return;
    }

    try {
      if (isSaved) {
        await contentService.removeFromUserList(tconst, token);
        setIsSaved(false);
      } else {
        await contentService.addToUserList(tconst, token);
        setIsSaved(true);
      }
    } catch (error) {
      console.error("Error al actualizar la lista:", error);
    }
  };

  return { isSaved, toggleSave };
};
