import { useEffect } from "react";
import { useTranslation } from "react-i18next"; // <-- importar i18n
import { useDefaultImages } from "../../hooks/useDefaultImages";
import { useUserImages } from "../../hooks/useUserImages";
import ModalPortal from "../templates/ModalPortal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

const DefaultImageSelector: React.FC<Props> = ({ isOpen, onClose, onSelect }) => {
  const { images: defaultImages, loading: loadingDefaults, refresh: refreshDefaults } = useDefaultImages();
  const { images: userImages, loading: loadingUserImages, refresh: refreshUserImages } = useUserImages();
  const { t } = useTranslation("profile"); // <-- usar traducción profile

  useEffect(() => {
    if (isOpen) {
      refreshDefaults();
      refreshUserImages();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[1000]">
        <div className="bg-neutral-800 p-6 rounded-lg max-w-4xl w-full mx-4 overflow-y-auto max-h-[90vh]">
          <h2 className="text-white text-2xl font-semibold mb-6 text-center">
            {t("select_profile_image")}
          </h2>

          {/* DEFAULT IMAGES */}
          <div className="mb-6">
            <h3 className="text-white text-xl font-semibold mb-4">{t("default")}</h3>
            {loadingDefaults ? (
              <p className="text-white text-center">{t("loading_images")}</p>
            ) : defaultImages.length === 0 ? (
              <p className="text-white text-center">{t("no_default_images")}</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {defaultImages.map((img) => (
                  <div
                    key={img.id}
                    className="cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => {
                      onSelect(img.imageUrl);
                      onClose();
                    }}
                  >
                    <img
                      src={img.imageUrl}
                      alt={img.description}
                      className="rounded-md w-full h-32 object-cover border border-white"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* USER PREVIOUS IMAGES */}
          <div className="mb-6">
            <h3 className="text-white text-xl font-semibold mb-4">{t("previously_used")}</h3>
            {loadingUserImages ? (
              <p className="text-white text-center">{t("loading_previous_images")}</p>
            ) : userImages.length === 0 ? (
              <p className="text-white text-center">{t("no_previous_images")}</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {userImages.map((img) => (
                  <div
                    key={img.id}
                    className="cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => {
                      onSelect(img.imageUrl);
                      onClose();
                    }}
                  >
                    <img
                      src={img.imageUrl}
                      alt="Imagen anterior"
                      className="rounded-md w-full h-32 object-cover border border-white"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded block mx-auto"
          >
            {t("cancel")}
          </button>
        </div>
      </div>
    </ModalPortal>
  );
};

export default DefaultImageSelector;
