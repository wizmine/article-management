import { Layout, Typography } from "antd";
import { CSSProperties } from "react";

const AppFooter = () => {
  return (
    <Layout.Footer style={footerStyle}>
      <Typography.Title level={5} style={{ color: "blueviolet" }}>
        Article Management Website
      </Typography.Title>
    </Layout.Footer>
  );
};

export default AppFooter;

const footerStyle: CSSProperties = {
  textAlign: "center",
  height: 50,
  padding: "1rem",
  color: "#fff",
  backgroundColor: "#dbebff",
};
