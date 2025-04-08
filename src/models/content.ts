import { StreamingService } from "./streaming";

export interface Content {
    tconst: string;
    titleType: string;
    primaryTitle: string;
    originalTitle: string;
    isAdult: boolean;
    startYear?: number | null;
    endYear?: number | null;
    runtimeMinutes: number;
    genres: string[];
    posterUrl: string;
    ratings: {
        averageRating: number;
        numVotes: number;
    };
    directors: { nconst: string; primaryName: string }[];
    writers: { nconst: string; primaryName: string }[];
    streamingServices?: StreamingService[];
}
