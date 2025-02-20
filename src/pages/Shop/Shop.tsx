import ShopCard from "@components/ShopCard/ShopCard";
import Title from "antd/es/typography/Title";
import Search from "antd/es/input/Search";
import { Col, Flex, Row } from "antd";

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
          <Search
            onChange={handleInputChange}
            placeholder="Search by Book Name"
            allowClear
          />
        </Col>
      </Row>
      <Row gutter={[32, 32]}>
        {filteredbooks?.map((book) => (
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
