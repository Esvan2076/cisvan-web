export interface Person {
    nconst: string;
    primaryName: string;
    birthYear?: number;
    deathYear?: number;
    primaryProfession: string[];
    knownForTitles: string[];
    imageUrl?: string;
  }
  
  const API_URL = `${import.meta.env.VITE_API_URL}/name-basics`;
  
  export const getPersonById = async (nconst: string): Promise<Person> => {
    const response = await fetch(`${API_URL}/${nconst}`);
    if (!response.ok) {
      throw new Error("Error al obtener la persona");
    }
    return response.json();
  };
  