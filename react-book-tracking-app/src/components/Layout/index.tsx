import { Outlet } from "react-router-dom";

import { Layout as AntLayout } from "antd";
import { Header } from "../Header";

export const Layout = () => {
  return (
    <AntLayout style={{ height: "100vh" }}>
      <Header />
      <AntLayout.Content style={{ padding: "0 2rem" }}>
        <Outlet />
      </AntLayout.Content>
    </AntLayout>
  );
};
