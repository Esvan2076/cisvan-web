export interface UserPage {
    id: number;
    username: string;
    profileImageUrl: string;
    currentRank: 1 | 2 | 3 | 4 | 5;
    trendDirection: "U" | "D" | "S";
    following: boolean;
    mySelf: boolean;
}