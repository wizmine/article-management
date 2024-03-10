import { Button, Flex, Layout, Typography } from "antd";
import { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { logout } from "../../redux/slices/auth";

const AppHeader = () => {
  const dispatch = useAppDispatch();
  const isAdmin = useAppSelector((state) => state.auth.data?.isAdmin);
  const isAuth = useAppSelector((state) => Boolean(state.auth.data));

  const onClickLogout = () => {
    if (window.confirm("Are you sure you want to log?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <Layout.Header style={headerStyle}>
      <Typography.Title level={3}>
        <Link to="/">Article Management</Link>
      </Typography.Title>
      <Flex align="center">
        {isAdmin && (
          <Link to="/admin-panel" style={{ marginRight: "10px" }}>
            <Button type="primary">Admin Panel</Button>
          </Link>
        )}
        {isAuth ? (
          <Button type="primary" onClick={onClickLogout} danger>
            Go out
          </Button>
        ) : (
          <Link to="/login" style={{ marginRight: "10px" }}>
            <Button type="primary">Login</Button>
          </Link>
        )}
      </Flex>
    </Layout.Header>
  );
};

export default AppHeader;

const headerStyle: CSSProperties = {
  width: "100%",
  textAlign: "center",
  height: 60,
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "aliceblue",
  boxShadow: "10px 5px black",
};
