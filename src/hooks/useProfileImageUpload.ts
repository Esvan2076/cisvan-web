import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { userService } from "../services/userService";
import { TFunction } from "i18next";

export const useProfileImageUpload = (
  onSuccess: (newImageUrl: string) => void,
  t: TFunction<"profile">
) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // 👈 asegurado
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    // Verificar formato del archivo
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      toast.error(t("unsupported_format"));
      return;
    }
  
    // Verificar tamaño del archivo (máximo 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error(t("file_too_large"));
      return;
    }
  
    const url = URL.createObjectURL(file);
    setPreview(url);
    setSelectedFile(file);
  };  

  const handleUpload = async () => {
    const file = selectedFile || fileInputRef.current?.files?.[0];
    if (!file) {
      toast.error(t("no_file_to_upload"));
      return;
    }

    try {
      setUploading(true);
      const newUrl = await userService.uploadProfileImage(file);
      onSuccess(newUrl);
      toast.success(t("profile_image_updated"));
      setPreview(null);
      setSelectedFile(null);
    } catch {
      toast.error(t("upload_error"));
    } finally {
      setUploading(false);
    }
  };

  const requestFile = async (confirmMessage: string) => {
    return new Promise<void>((resolve, reject) => {
      if (!window.File || !window.FileReader) {
        reject(new Error(t("device_not_supported")));
        return;
      }

      const allow = window.confirm(confirmMessage);
      if (!allow) {
        reject(new Error(t("file_access_denied")));
        return;
      }

      const input = fileInputRef.current;
      if (!input) {
        reject(new Error(t("input_not_found")));
        return;
      }

      try {
        input.click();
        resolve();
      } catch (error) {
        reject(new Error(t("file_access_denied")));
      }
    });
  };

  const handleRemoveImage = async () => {
    try {
      setUploading(true);
      await userService.deleteProfileImage();
      onSuccess("");
      setPreview(null);
      setSelectedFile(null);
    } catch (error) {
      toast.error((error as Error).message || t("error_deleting_image"));
    } finally {
      setUploading(false);
    }
  };

  const handleBlobUpload = async (blob: Blob) => {
    const file = new File([blob], "captured.jpg", { type: "image/jpeg" });
    const url = URL.createObjectURL(file);
    setPreview(url);
    setSelectedFile(file);
  };

  return {
    preview,
    uploading,
    setPreview,
    setSelectedFile,
    selectedFile,
    fileInputRef,
    requestFile,
    handleUpload,
    handleFileChange,
    handleRemoveImage,
    handleBlobUpload,
  };
};
