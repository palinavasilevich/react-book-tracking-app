import { FC } from "react";
import { Alert } from "antd";

type Props = {
  message?: string;
};

export const ErrorMessage: FC<Props> = ({ message }) => {
  if (!message) {
    return null;
  }

  return <Alert message={message} type="error" />;
};
