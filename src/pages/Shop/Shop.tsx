import ShopCard from "@components/ShopCard/ShopCard";
import { Col, Flex, Row } from "antd";
import Search from "antd/es/input/Search";
import Title from "antd/es/typography/Title";
import useShop from "./useShop";

const Shop = () => {
  const { filteredbooks, handleInputChange } = useShop();
  return (
    <Flex vertical gap={"1rem"}>
      <Row justify={"space-between"}>
        <Col>
          <Title level={3} style={{ margin: 0 }}>
            Browse Books
          </Title>
        </Col>
        <Col>
          <Search onChange={handleInputChange} />
        </Col>
      </Row>
      <Row gutter={16}>
        {filteredbooks.slice(0, 10)?.map((book) => (
          <Col sm={24} md={12} lg={8} key={book.id}>
            <ShopCard
              title={book.name.slice(0, 20)}
              authorName={book.authorName}
              bookCoverPage={book.name.slice(0, 20)}
              storeName="store name"
            />
          </Col>
        ))}
      </Row>
    </Flex>
  );
};

export default Shop;
