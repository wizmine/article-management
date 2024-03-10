import React from "react";
import { Layout } from "antd";
import { CSSProperties } from "react";
import { Route, Routes } from "react-router-dom";
import Registration from "../../pages/Registration";
import Login from "../../pages/Login";
import Main from "../../pages/Main";
import AdminPanel from "../../pages/AdminPanel";

const AppContent = () => {
  return (
    <Layout.Content style={contentStyle}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </Layout.Content>
  );
};

export default AppContent;

const contentStyle: CSSProperties = {
  padding: "1rem",
  textAlign: "center",
  minHeight: "calc(100vh - 110px)",
  color: "#fff",
  backgroundColor: "aliceblue",
};
