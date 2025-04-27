import { useEffect, useState } from "react";
import { userService } from "../services/userService";
import { DefaultImage } from "../models/DefaultImage";
import { toast } from "react-toastify";

export const useDefaultImages = () => {
  const [images, setImages] = useState<DefaultImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await userService.getDefaultImages();
      setImages(data);
    } catch (err) {
      setError("Error cargando imágenes predeterminadas.");
      toast.error("Error cargando imágenes predeterminadas.");
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
