import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDefaultImages } from "../../hooks/useDefaultImages";
import { useUserImages } from "../../hooks/useUserImages";
import ModalPortal from "../templates/ModalPortal";
import { IoClose } from "react-icons/io5";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

const DefaultImageSelector: React.FC<Props> = ({ isOpen, onClose, onSelect }) => {
  const { images: defaultImages, loading: loadingDefaults, refresh: refreshDefaults } = useDefaultImages();
  const { images: userImages, loading: loadingUserImages, refresh: refreshUserImages } = useUserImages();
  const { t } = useTranslation("profile");

  useEffect(() => {
    if (isOpen) {
      refreshDefaults();
      refreshUserImages();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[1000] select-none">
        <div className="relative bg-neutral-800 p-8 rounded-lg w-[90vw] max-w-7xl mx-4 overflow-y-auto max-h-[90vh] select-none">
          
          {/* Botón X con icono grande */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white text-5xl hover:text-red-500 transition-colors select-none"
          >
            <IoClose />
          </button>

          <h2 className="text-white text-3xl font-semibold mb-8 text-center">
            {t("select_profile_image")}
          </h2>

          {/* DEFAULT IMAGES */}
          <div className="mb-8">
            <h3 className="text-white text-2xl font-semibold mb-4">{t("default")}</h3>
            {loadingDefaults ? (
              <p className="text-white text-center">{t("loading_images")}</p>
            ) : defaultImages.length === 0 ? (
              <p className="text-white text-center">{t("no_default_images")}</p>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {defaultImages.map((img) => (
                  <div
                    key={img.id}
                    className="cursor-pointer hover:scale-105 transition-transform select-none"
                    onClick={() => {
                      onSelect(img.imageUrl);
                      onClose();
                    }}
                  >
                    <img
                      src={img.imageUrl}
                      alt={img.description}
                      className="rounded-md w-full h-32 object-cover border border-white pointer-events-none"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* USER PREVIOUS IMAGES */}
          <div className="mb-6">
            <h3 className="text-white text-2xl font-semibold mb-4">{t("previously_used")}</h3>
            {loadingUserImages ? (
              <p className="text-white text-center">{t("loading_previous_images")}</p>
            ) : userImages.length === 0 ? (
              <p className="text-white text-center">{t("no_previous_images")}</p>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {userImages.map((img) => (
                  <div
                    key={img.id}
                    className="cursor-pointer hover:scale-105 transition-transform select-none"
                    onClick={() => {
                      onSelect(img.imageUrl);
                      onClose();
                    }}
                  >
                    <img
                      src={img.imageUrl}
                      alt="Imagen anterior"
                      className="rounded-md w-full h-32 object-cover border border-white pointer-events-none"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default DefaultImageSelector;
