import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next"; // <-- i18n
import ModalPortal from "../templates/ModalPortal";

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (blob: Blob) => void;
}

const CameraModal: React.FC<CameraModalProps> = ({ isOpen, onClose, onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const { t } = useTranslation("profile");

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        setStream(mediaStream);
      } catch (err) {
        console.error("Error accediendo a la cámara:", err);
        onClose();
      }
    };

    if (isOpen) {
      startCamera();
    }

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [isOpen, onClose]);

  const handleCapture = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          onCapture(blob);
          onClose();
        }
      }, "image/jpeg");
    }
  };

  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[1000]">
        <div className="bg-neutral-800 p-6 rounded-lg flex flex-col gap-4 items-center">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-80 h-60 rounded-md bg-black object-cover"
          />

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleCapture}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              {t("capture")}
            </button>

            <button
              onClick={onClose}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default CameraModal;
