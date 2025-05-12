// components/organisms/NotificationBox.tsx
import { useNotifications } from "../../hooks/useNotifications";
import NotificationItem from "../molecules/NotificationItem";
import { useTranslation } from "react-i18next";

interface NotificationBoxProps {
  emailNotifications: boolean;
}

const NotificationBox: React.FC<NotificationBoxProps> = ({ emailNotifications }) => {
  const { t } = useTranslation("profile");
  const { notifications, loading } = useNotifications();

  return (
    <div
      className={`border rounded-lg w-full max-w-sm select-none ${
        emailNotifications ? "border-blue-500" : "border-gray-500"
      }`}
    >
      <div
        className={`p-2 border-b font-bold ${
          emailNotifications ? "text-blue-400 border-blue-500" : "text-gray-400 border-gray-500"
        }`}
      >
        {t("notifications")}:
      </div>
      {loading ? (
        <div className="p-2 text-gray-400">{t("loading")}</div>
      ) : notifications.length === 0 ? (
        <div className="p-2 text-gray-400">{t("no_notifications")}</div>
      ) : (
        <div className="max-h-[220px] overflow-y-auto flex flex-col">
          {notifications.map((n) => (
            <NotificationItem key={n.id} notification={n} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationBox;
