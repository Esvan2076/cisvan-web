// components/molecules/NotificationItem.tsx (actualizado)
import { Notification } from "../../models/Notification";
import { useNavigate } from "react-router-dom";

interface Props {
  notification: Notification;
}

const NotificationItem: React.FC<Props> = ({ notification }) => {
  const navigate = useNavigate();

  const parseMessage = () => {
    const match = notification.message.match(/\[(.+?)\]/);
    if (!match || !notification.referenceType || !notification.referenceId)
      return <span className="text-gray-300">{notification.message}</span>;

    const display = match[1];
    const parts = notification.message.split(match[0]);

    const path =
      notification.referenceType === "CONTENT"
        ? `/content/${notification.referenceId}`
        : `/history/${notification.referenceId}`;

    return (
      <span className="text-gray-300">
        {parts[0]}
        <span
          onClick={() => navigate(path)}
          className="text-blue-400 underline cursor-pointer hover:text-blue-600"
        >
          {display}
        </span>
        {parts[1]}
      </span>
    );
  };

  return (
    <div className="p-2 border-t border-gray-600 text-sm">
      {parseMessage()}
    </div>
  );
};

export default NotificationItem;
