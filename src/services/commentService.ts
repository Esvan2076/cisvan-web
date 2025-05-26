// services/commentService.ts
import { Comment } from "../models/Comment";
import { BASE_API } from "../constants/api";
import { Reply } from "../models/Reply";
import { ReportedComment } from "../models/ReportedComment";

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
  
    const url = `${BASE_API}/comments-like/${commentId}/like-toggle`;
  
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) {
      throw new Error("Error al alternar el estado del like");
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

  // services/commentService.ts (extensión)
  getReplies: async (commentId: number): Promise<Reply[]> => {
    const token = localStorage.getItem("auth_token");
    const res = await fetch(`${BASE_API}/comments/replies/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token ?? ""}`,
      },
    });

    if (!res.ok) throw new Error("No se pudieron cargar las respuestas");

    return res.json();
  },

  addReply: async (
    parentCommentId: number,
    replyToUserId: number,
    commentText: string,
    containsSpoiler: boolean
  ): Promise<void> => {
    const token = localStorage.getItem("auth_token");
    if (!token) throw new Error("Unauthorized");

    const res = await fetch(`${BASE_API}/comments/reply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        parentCommentId,
        replyToUserId,
        commentText,
        containsSpoiler,
      }),
    });

    if (!res.ok) {
      throw new Error("No se pudo enviar la respuesta");
    }
  },

  report: async (commentId: number) => {
    const token = localStorage.getItem("auth_token"); // Asumiendo que lo guardas así
    if (!token) throw new Error("No auth token found");


    const response = await fetch(`${BASE_API}/comments/${commentId}/report`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Failed to report comment");
    return response.json();
  },

  getReportedComments: async (token: string): Promise<ReportedComment[]> => {
    const response = await fetch(`${BASE_API}/comments/admin/reported`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch reported comments");
    }

    return response.json();
  },

  // src/services/commentService.ts
  unreportComment: async (commentId: number) => {
    const token = localStorage.getItem("auth_token");
    if (!token) throw new Error("No auth token found");

    const response = await fetch(
      `${BASE_API}/comments/admin/unreport/${commentId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to unreport comment");
    }

    return await response.json();
  },
};
