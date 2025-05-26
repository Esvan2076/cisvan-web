// src/models/ReportedComment.ts
export interface ReportedComment {
  id: number;
  commentText: string;
  tconst: string;
  primaryTitle: string;
  user: {
    id: number;
    username: string;
    profileImageUrl: string;
    currentRank: 1 | 2 | 3 | 4 | 5;
    trendDirection: "U" | "D" | "S";
  };
  replyToUserId: number | null;
  replyToUsername: string | null;
}
