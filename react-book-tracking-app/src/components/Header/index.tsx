import { FC, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Layout, Space, Typography, Button } from "antd";
import {
  MoonOutlined,
  SunOutlined,
  BookOutlined,
  UserOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { ThemeProviderContext } from "../ThemeProvider";

import {
  logout,
  selectIsAuthenticated,
  selectUser,
} from "../../features/auth/authSlice";

import styles from "./Header.module.scss";

export const Header: FC = () => {
  const dispatch = useDispatch();
  const { theme, setTheme } = useContext(ThemeProviderContext);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Layout.Header className={styles.header}>
      <Space>
        <Link to="/">
          <BookOutlined className={styles.icon} />
          <Button type="link">
            <Typography.Title level={1} className={styles.logoTitle}>
              My Books
            </Typography.Title>
          </Button>
        </Link>
      </Space>

      <Space>
        {user ? (
          <Button type="text" icon={<LoginOutlined />} onClick={onLogoutClick}>
            Logout
          </Button>
        ) : (
          <>
            <Link to="/login">
              <Button type="text" icon={<LoginOutlined />}>
                Sign in
              </Button>
            </Link>
            <Link to="/register">
              <Button type="text" icon={<UserOutlined />}>
                Sign up
              </Button>
            </Link>
          </>
        )}
        <Button
          type="text"
          onClick={
            theme === "dark" ? () => setTheme("light") : () => setTheme("dark")
          }
          icon={theme === "dark" ? <MoonOutlined /> : <SunOutlined />}
        />
      </Space>
    </Layout.Header>
  );
};
