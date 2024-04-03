import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

type notificationContentArgs = {
  message: string;
  description?: string;
};

export const useNotificationAntd = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (
    type: NotificationType,
    notificationContent: notificationContentArgs,
  ) => {
    api[type](notificationContent);
  };

  return { contextHolder, openNotificationWithIcon };
};
