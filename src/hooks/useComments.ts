import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { commentService } from "../services/commentService";
import { Comment } from "../models/Comment";
import { useFetch } from "./shared/useFetch";

export const useComments = (contentId?: string) => {
  const navigate = useNavigate();

  const {
    data: comments,
    loading,
    error,
    refresh,
  } = useFetch<Comment[]>(
    () => commentService.getByTitleId(contentId!),
    [contentId],
    !contentId
  );

  const addComment = useCallback(
    async (
      tconst: string,
      commentText: string,
      containsSpoiler: boolean = false
    ) => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        navigate("/auth");
        return false;
      }

      try {
        await commentService.addComment(tconst, commentText, containsSpoiler);
        refresh();
        return true;
      } catch (err) {
        console.error("Error al publicar el comentario:", err);
        return false;
      }
    },
    [navigate, refresh]
  );

  const toggleLike = useCallback(
    async (commentId: number) => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        navigate("/auth");
        return false;
      }

      try {
        await commentService.toggleLike(commentId);
        refresh();
        return true;
      } catch (err) {
        console.error("Error al alternar el estado del like:", err);
        return false;
      }
    },
    [navigate, refresh]
  );

  const deleteComment = useCallback(
    async (commentId: number) => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        navigate("/auth");
        return false;
      }

      try {
        await commentService.deleteById(commentId);
        refresh();
        return true;
      } catch (err) {
        console.error("Error al eliminar el comentario:", err);
        return false;
      }
    },
    [navigate, refresh]
  );

  const getReportedComments = useCallback(async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      navigate("/auth");
      return [];
    }

    try {
      const reported = await commentService.getReportedComments(token);
      return reported;
    } catch (err) {
      console.error("Error fetching reported comments:", err);
      return [];
    }
  }, [navigate]);

  const unreportComment = useCallback(
    async (commentId: number) => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        navigate("/auth");
        return false;
      }

      try {
        await commentService.unreportComment(commentId);
        refresh(); // opcional: refrescar lista
        return true;
      } catch (err) {
        console.error("Error al quitar el reporte:", err);
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
    getReportedComments,
    unreportComment,
  };
};
