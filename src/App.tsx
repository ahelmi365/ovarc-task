import { Layout } from "antd";
import "./App.css"; // Import the CSS file

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <Layout className="layout">
      <Header className="header">Header</Header>
      <Content className="content">Content</Content>
      <Footer className="footer">Footer</Footer>
    </Layout>
  );
}

export default App;
