import { Spin } from "antd";
import { useCurrentQuery } from "../../app/services/authApi";

export const Auth = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentQuery();

  if (isLoading) {
    return <Spin size="large" />;
  }

  return children;
};
