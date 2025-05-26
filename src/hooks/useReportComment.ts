// src/hooks/useReportComment.ts
import { useState } from "react";
import { commentService } from "../services/commentService";

export const useReportComment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reportComment = async (commentId: number): Promise<boolean> => {
    try {
      setLoading(true);
      console.log("reporting comment", commentId);
      await commentService.report(commentId);
      setError(null);
      return true;
    } catch (err) {
      console.error("error.reporting_comment");
      return false;
    } finally {
      setLoading(false);
    }
  };

  

  return { reportComment, loading, error };


};
