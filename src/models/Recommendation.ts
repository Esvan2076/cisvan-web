// models/Recommendation.ts
export interface Recommendation {
    tconst: string;
    titleType: string;
    primaryTitle: string;
    startYear: number;
    endYear: number | null;
    posterUrl: string;
    titleRating: {
    tconst: string;
    averageRating: number;
    numVotes: number;
    };
}