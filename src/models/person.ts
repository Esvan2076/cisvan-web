export interface Person {
    nconst: string;
    primaryName: string;
    birthYear?: number;
    deathYear?: number;
    primaryProfession: string[];
    knownForTitles: string[];
    imageUrl?: string;
}

export interface KnownForItem {
    tconst: string;
    titleType: string;
    primaryTitle: string;
    startYear: number;
    posterUrl: string;
    ratings: {
    tconst: string;
    averageRating: number;
    numVotes: number;
    };
}

export interface PersonSearchResult {
    nconst: string;
    primaryName: string;
    primaryProfession: string;
    principalTitle: {
        primaryTitle: string;
        startYear: number;
        endYear: number | null;
    };
}
