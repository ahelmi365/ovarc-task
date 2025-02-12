import appLogo from "@assets/svg/appLogo.svg";
import appLogoSmall from "@assets/svg/appLogoSmall.svg";
import authorIcon from "@assets/svg/authorIcon.svg";
import BooksIcon from "@assets/svg/BooksIcon.svg";
import shopIcon from "@assets/svg/shopIcon.svg";
import storeIcon from "@assets/svg/storeIcon.svg";
import Spinner from "@components/Spinner/Spinner";
// import Authors from "@pages/Authors/Authors";
// import Books from "@pages/Books/Books";
// import Shop from "@pages/Shop/Shop";
// import Stores from "@pages/Stores/Stores";
import { lazy } from "react";
const Authors = lazy(() => import("@pages/Authors/Authors"));
const Books = lazy(() => import("@pages/Books/Books"));
const Shop = lazy(() => import("@pages/Shop/Shop"));
const Stores = lazy(() => import("@pages/Stores/Stores"));
import { useAppSelector } from "@store/hooks";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import React, { Suspense, useState } from "react";

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
  const [appLogoSrc, setAppLogoSrc] = useState(appLogo);
  const [selectedKey, setSelectedKey] = useState("1");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const renderContent = () => {
    switch (selectedKey) {
      case "1":
        return (
          <Suspense fallback={<Spinner />}>
            <Shop />
          </Suspense>
        );
      case "2":
        return (
          <Suspense fallback={<Spinner />}>
            <Stores />
          </Suspense>
        );
      case "3":
        return (
          <Suspense fallback={<Spinner />}>
            <Authors />
          </Suspense>
        );
      case "4":
        return (
          <Suspense fallback={<Spinner />}>
            <Books />
          </Suspense>
        );
      default:
        return (
          <Suspense fallback={<Spinner />}>
            {" "}
            <Shop />
          </Suspense>
        );
    }
  };
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {isLoading && <Spinner />}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => {
          setCollapsed(value);
          if (value) {
            setAppLogoSrc(appLogoSmall);
          } else {
            setAppLogoSrc(appLogo);
          }
        }}
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
        <div className="demo-logo-vertical" style={{ transition: "all 0.5s" }}>
          <img
            src={appLogoSrc}
            alt="Book world logo"
            width={collapsed ? 50 : 150}
            style={{ transition: "all 0.5s" }}
          />
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
            <Breadcrumb.Item>
              {(
                items.find(
                  (item) => item?.key === selectedKey && "label" in item
                ) as MenuItem
              )?.label ?? "Unknown"}
            </Breadcrumb.Item>
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
