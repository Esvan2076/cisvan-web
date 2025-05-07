// models/Comment.ts
export interface Comment {
    id: number;
    commentText: string;
    likeCount: number;
    containsSpoiler: boolean;
    createdAt: string;
    likedByMe: boolean;
    user: {
        id: number;
        username: string;
        profileImageUrl: string;
        currentRank: 1 | 2 | 3 | 4 | 5;
        trendDirection: "U" | "D" | "S";
    };
}