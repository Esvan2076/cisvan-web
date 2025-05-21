// components/organisms/NotificationPreferenceModal.tsx
import { IoClose } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import ModalPortal from "../templates/ModalPortal";
interface NotificationPreferenceModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const NotificationPreferenceModal: React.FC<
  NotificationPreferenceModalProps
> = ({ onClose, onConfirm }) => {
  const { t } = useTranslation();

  return (
    <ModalPortal>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[1000] select-none">
        <div className="relative bg-neutral-800 p-6 rounded-lg w-full max-w-md max-w-[95vw] mx-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white text-3xl hover:text-red-500 transition-colors"
          >
            <IoClose />
          </button>
          <h2 className="text-white text-2xl font-semibold mb-4 text-center">
            {t("notification_preference")}
          </h2>
          <p className="text-gray-300 text-center mb-6">
            {t("email_notification_prompt")}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={onConfirm} // ← ya no llamamos handleToggleNotifications aquí
              className="px-4 py-2 bg-green-600 text-white font-bold rounded hover:bg-green-700 transition-colors"
            >
              {t("enable_notifications")}
            </button>

            <button
              onClick={onClose} // ← igual aquí
              className="px-4 py-2 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition-colors"
            >
              {t("disable_notifications")}
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default NotificationPreferenceModal;
