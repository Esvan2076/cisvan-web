import { useEffect, useState } from "react";
import { userService } from "../services/userService";

interface UserImage {
  id: number;
  userId: number;
  imageUrl: string;
  createdAt: string;
}

export const useUserImages = () => {
  const [images, setImages] = useState<UserImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await userService.getUserImages();
      setImages(data);
    } catch (err) {
      setError("Error cargando imágenes anteriores.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return {
    images,
    loading,
    error,
    refresh: fetchImages,
  };
};
