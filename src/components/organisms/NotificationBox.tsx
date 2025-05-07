// components/organisms/NotificationBox.tsx (actualizado)
import { useNotifications } from "../../hooks/useNotifications";
import NotificationItem from "../molecules/NotificationItem";
import { useTranslation } from "react-i18next";

const NotificationBox = () => {
  const { t } = useTranslation("profile");
  const { notifications, loading } = useNotifications();

  return (
    <div className="border border-white rounded-lg w-full max-w-sm select-none">
      <div className="p-2 border-b border-white font-bold">
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
