// services/commentService.ts
import { Comment } from "../models/Comment";
import { BASE_API } from "../constants/api";

export const commentService = {
  getByTitleId: async (tconst: string): Promise<Comment[]> => {
    const res = await fetch(`${BASE_API}/comments/title/${tconst}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token") || ""}`,
      },
    });

    if (!res.ok) throw new Error("No se pudieron cargar los comentarios");

    return res.json();
  },

  toggleLike: async (commentId: number): Promise<void> => {
    const token = localStorage.getItem("auth_token");
    if (!token) throw new Error("Unauthorized");

    const url = `${BASE_API}/comments-like/${commentId}/like`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 409) {
      // already liked → remove
      const remove = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!remove.ok) throw new Error("Error al quitar el like");
    } else if (!res.ok) {
      throw new Error("Error al dar like");
    }
  },

  // services/commentService.ts (añadir método)
  addComment: async (
    tconst: string,
    commentText: string,
    containsSpoiler: boolean
  ): Promise<void> => {
    const token = localStorage.getItem("auth_token");
    if (!token) throw new Error("Unauthorized");

    const res = await fetch(`${BASE_API}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        tconst,
        commentText,
        containsSpoiler,
      }),
    });

    if (!res.ok) {
      throw new Error("No se pudo publicar el comentario");
    }
  },

  // services/commentService.ts (añadir método)
  deleteById: async (commentId: number): Promise<void> => {
    const token = localStorage.getItem("auth_token");
    if (!token) throw new Error("Unauthorized");

    const res = await fetch(`${BASE_API}/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("No se pudo eliminar el comentario");
    }
  },
};
