const API_URL = `${import.meta.env.VITE_API_URL}/principal`;

export interface CastMember {
    nconst: string;
    primaryName: string;
    characters: string;
    imageUrl: string;
  }
  
  
  export const getCastByContentId = async (contentId: string): Promise<CastMember[]> => {
    const res = await fetch(`${API_URL}/${contentId}/cast`);
    if (!res.ok) throw new Error("Error fetching cast");
    return res.json();
  };
  