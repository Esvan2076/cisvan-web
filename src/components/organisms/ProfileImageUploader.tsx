import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useProfileImageUpload } from "../../hooks/useProfileImageUpload";
import ImageBox from "../atoms/ImageBox";
import CameraModal from "./CameraModal";
import DefaultImageSelector from "./DefaultImageSelector";
import { toast } from "react-toastify";
import { FaUpload, FaCamera, FaImage, FaTrash } from "react-icons/fa";
import { userService } from "../../services/userService"; // 👈 para setDefaultProfileImage

interface Props {
  currentImage: string;
  onUploaded: (newUrl: string) => void;
}

const DEFAULT_IMAGE = "/default-user.png";

const ProfileImageUploader: React.FC<Props> = ({ currentImage, onUploaded }) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [refreshSelectorKey, setRefreshSelectorKey] = useState(0);
  const [defaultImageSelected, setDefaultImageSelected] = useState<string | null>(null); // 👈 NUEVO

  const { t } = useTranslation("profile");

  const {
    preview,
    setPreview,
    uploading,
    fileInputRef,
    requestFile,
    handleUpload: internalHandleUpload,
    handleFileChange,
    handleBlobUpload,
    handleRemoveImage,
    setSelectedFile,
    selectedFile,
  } = useProfileImageUpload(
    async (newUrl) => {
      onUploaded(newUrl);
      setRefreshSelectorKey((prev) => prev + 1);
    },
    t
  );

  const handleUpload = async () => {
    if (defaultImageSelected) {
      try {
        await userService.setDefaultProfileImage(defaultImageSelected);
        toast.success(t("profile_image_updated"));
        onUploaded(defaultImageSelected);
        setDefaultImageSelected(null);
        setPreview(null);
        setRefreshSelectorKey((prev) => prev + 1);
      } catch (error) {
        toast.error(t("upload_error"));
      }
      return;
    }

    await internalHandleUpload();
    setRefreshSelectorKey((prev) => prev + 1);
  };

  const handleSelectImage = async () => {
    try {
      await requestFile(t("allow_file_access"));
    } catch {
      toast.error(t("file_access_denied"));
    }
  };

  const handleTakePhoto = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());
      setIsCameraOpen(true);
    } catch {
      toast.error(t("camera_access_denied"));
    }
  };

  const handleCapture = async (blob: Blob) => {
    await handleBlobUpload(blob);
    setDefaultImageSelected(null); // 👈 limpiamos por si acaso
    setIsCameraOpen(false);
  };

  const handleOpenDefaultSelector = () => {
    setIsSelectorOpen(true);
  };

  const handleDeleteImage = async () => {
    try {
      await handleRemoveImage();
      onUploaded(DEFAULT_IMAGE);
      setDefaultImageSelected(null);
      setRefreshSelectorKey((prev) => prev + 1);
    } catch (error) {
      toast.error((error as Error).message || t("error_deleting_image"));
    }
  };

  const handleSelectDefaultImage = async (url: string) => {
    try {
      setPreview(url);
      setSelectedFile(null);
      setDefaultImageSelected(url);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setIsSelectorOpen(false);
      toast.success(t("default_image_loaded"));
    } catch (error) {
      console.error(error);
      toast.error(t("error_loading_default_image"));
    }
  };

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-6 min-h-[10rem]">
          <div className="w-40 h-40 rounded-xl border border-white overflow-hidden flex-shrink-0">
            <ImageBox src={preview || currentImage || DEFAULT_IMAGE} alt="preview" />
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleSelectImage}
              className="w-10 h-10 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              <FaUpload size={20} />
            </button>

            <button
              onClick={handleTakePhoto}
              className="w-10 h-10 flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white rounded"
            >
              <FaCamera size={20} />
            </button>

            <button
              onClick={handleOpenDefaultSelector}
              className="w-10 h-10 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded"
            >
              <FaImage size={20} />
            </button>

            <button
              onClick={handleDeleteImage}
              className="w-10 h-10 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded"
            >
              <FaTrash size={20} />
            </button>
          </div>
        </div>

        {(preview || defaultImageSelected) && (
          <button
            onClick={handleUpload}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded text-sm w-40"
            disabled={uploading}
          >
            {uploading ? t("uploading") : t("confirm")}
          </button>
        )}
      </div>

      <input
        type="file"
        accept="image/jpeg,image/png"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleCapture}
      />

      <DefaultImageSelector
        key={refreshSelectorKey}
        isOpen={isSelectorOpen}
        onClose={() => setIsSelectorOpen(false)}
        onSelect={handleSelectDefaultImage}
      />
    </>
  );
};

export default ProfileImageUploader;
