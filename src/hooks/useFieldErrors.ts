import { toast } from "react-toastify";

export const useFieldErrors = () => {
  const handleApiError = async (res: Response, fallbackMsg: string) => {
    try {
      const data = await res.json();

      if (data.errors && Array.isArray(data.errors)) {
        data.errors.forEach((err: { field: string; message: string }) => {
          toast.error(`${err.field}: ${err.message}`);
        });
      } else {
        toast.error(fallbackMsg);
      }
    } catch {
      toast.error(fallbackMsg);
    }
  };

  return { handleApiError };
};
