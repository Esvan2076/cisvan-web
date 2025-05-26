export interface UserSearchResult {
  id: number;
  username: string;
  profileImageUrl: string;
  currentRank: 1 | 2 | 3 | 4 | 5;
  trendDirection: "U" | "D" | "S";
}

export interface UserSearchResponse {
  content: UserSearchResult[];
  totalPages: number;
  totalElements: number;
}
