import appLogo from "@assets/svg/appLogo.svg";
import authorIcon from "@assets/svg/authorIcon.svg";
import BooksIcon from "@assets/svg/BooksIcon.svg";
import shopIcon from "@assets/svg/shopIcon.svg";
import storeIcon from "@assets/svg/storeIcon.svg";
import Spinner from "@components/Spinner/Spinner";
import Authors from "@pages/Authors/Authors";
import Books from "@pages/Books/Books";
import Shop from "@pages/Shop/Shop";
import Stores from "@pages/Stores/Stores";
import { useAppSelector } from "@store/hooks";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import React, { useState } from "react";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Shop", "1", <img src={shopIcon} />),
  getItem("Stores", "2", <img src={storeIcon} />),
  getItem("Author", "3", <img src={authorIcon} />),
  getItem("Books", "4", <img src={BooksIcon} />),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const renderContent = () => {
    switch (selectedKey) {
      case "1":
        return <Shop />;
      case "2":
        return <Stores />;
      case "3":
        return <Authors />;
      case "4":
        return <Books />;
      default:
        return <Shop />;
    }
  };
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {isLoading && <Spinner />}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="light"
        style={{
          padding: "10px",
          position: "fixed",
          height: "100vh",
          left: 0,
          top: 0,
          bottom: 0,
          background: "#FFFFFF",
          zIndex: 1000,
          paddingTop: "4rem",
        }}
      >
        <div className="demo-logo-vertical">
          <img src={appLogo} alt="Book world logo" width={150} />
        </div>
        <Menu
          theme="light"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          style={{ background: "#FFFFFF", marginTop: "1rem" }}
          onSelect={({ key }) => setSelectedKey(key)}
        />
      </Sider>
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200,
          transition: "margin-left 0.2s",
        }}
      >
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {renderContent()}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
