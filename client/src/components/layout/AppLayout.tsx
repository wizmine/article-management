import { Layout } from "antd";
import AppHeader from "./AppHeader";
import AppContent from "./AppContent";
import AppFooter from "./AppFooter";

const AppLayout = () => {
  return (
    <Layout>
      <AppHeader />
      <AppContent />
      <AppFooter />
    </Layout>
  );
};

export default AppLayout;
