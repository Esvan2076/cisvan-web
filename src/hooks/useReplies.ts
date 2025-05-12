import { useState, useCallback } from "react";
import { Reply } from "../models/Reply";
import { useNavigate } from "react-router-dom";
import { commentService } from "../services/commentService";

export const useReplies = (commentId: number) => {
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchReplies = useCallback(async () => {
    setLoading(true);
    try {
      const response = await commentService.getReplies(commentId);
      setReplies(response);
    } catch (error) {
      console.error("Error al obtener respuestas:", error);
    } finally {
      setLoading(false);
    }
  }, [commentId]);

  const addReply = useCallback(
    async (
      parentCommentId: number,
      replyToUserId: number,
      commentText: string,
      containsSpoiler: boolean
    ) => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        navigate("/auth");
        return false;
      }

      try {
        await commentService.addReply(
          parentCommentId,
          replyToUserId,
          commentText,
          containsSpoiler
        );
        return true;
      } catch (err) {
        console.error("Error al enviar la respuesta:", err);
        return false;
      }
    },
    [navigate]
  );

  return { replies, loading, addReply, fetchReplies };
};
