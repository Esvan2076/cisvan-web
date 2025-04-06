export const fetchJson = async <T>(url: string, errorMessage = "Error al obtener los datos"): Promise<T> => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(errorMessage);
    return response.json() as Promise<T>;
};
