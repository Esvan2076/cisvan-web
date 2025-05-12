// models/ReviewData.ts
export interface Actor {
    nconst: string;
    primaryName: string;
}

export interface Director {
    nconst: string;
    primaryName: string;
}

export interface ReviewData {
    tconst: string;
    primaryTitle: string;
    genres: string[];
    actors: Actor[];
    directors: Director[];
}
