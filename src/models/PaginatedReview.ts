export interface PaginatedReview {
    content: Review[];
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
  }
  
  export interface Review {
    reviewId: number;
    comment: Comment;
    titleName: string;
    score: number;
    genres: ScoreItem[];
    actors: ScoreItem[];
    directors: ScoreItem[];
  }
  
  export interface Comment {
    id: number;
    commentText: string;
    likeCount: number;
    containsSpoiler: boolean;
    createdAt: string;
    user: User;
    likedByMe: boolean;
    replyCount: number;
  }
  
  export interface User {
    id: number;
    username: string;
    profileImageUrl: string;
    currentRank: 1 | 2 | 3 | 4 | 5;
    trendDirection: "U" | "D" | "S";
  }
  
  export interface ScoreItem {
    name?: string;
    primaryName?: string;
    score: number;
  }
  
  export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  }
  
  export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  }
  