// hooks/useComments.ts
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { commentService } from "../services/commentService";
import { Comment } from "../models/Comment";
import { useFetch } from "./shared/useFetch";

export const useComments = (contentId?: string) => {
  const navigate = useNavigate();

  // Obtener lista de comentarios
  const { data: comments, loading, error, refresh } = useFetch<Comment[]>(
    () => commentService.getByTitleId(contentId!),
    [contentId],
    !contentId
  );

  // Añadir comentario
  const addComment = useCallback(
    async (tconst: string, commentText: string, containsSpoiler: boolean = false) => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        navigate("/auth");
        return false;
      }

      try {
        await commentService.addComment(tconst, commentText, containsSpoiler);
        refresh(); // Actualizar comentarios después de añadir uno nuevo
        return true;
      } catch (err) {
        console.error("Error al publicar el comentario:", err);
        return false;
      }
    },
    [navigate, refresh]
  );

  // Dar o quitar like a un comentario
  const toggleLike = useCallback(
    async (commentId: number) => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        navigate("/auth");
        return false;
      }

      try {
        await commentService.toggleLike(commentId);
        refresh(); // Actualizar después de dar o quitar like
        return true;
      } catch (err) {
        console.error("Error al dar/retirar like:", err);
        return false;
      }
    },
    [navigate, refresh]
  );

  // Eliminar comentario
  const deleteComment = useCallback(
    async (commentId: number) => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        navigate("/auth");
        return false;
      }

      try {
        await commentService.deleteById(commentId);
        refresh(); // Actualizar después de eliminar
        return true;
      } catch (err) {
        console.error("Error al eliminar el comentario:", err);
        return false;
      }
    },
    [navigate, refresh]
  );

  return {
    comments,
    loading,
    error,
    addComment,
    toggleLike,
    deleteComment,
    refresh,
  };
};
