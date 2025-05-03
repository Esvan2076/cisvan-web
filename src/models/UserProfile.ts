// models/UserProfile.ts

export interface UserProfile {
    id: number;
    username: string;
    profileImageUrl: string;
    followStats: {
      followingCount: number;
      followersCount: number;
    };
    userPrestigeDTO: {
      currentRank: number;
      weightedScore: number;
      trendDirection: "U" | "D" | "S";
    };
  }
  