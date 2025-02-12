import { Flex, Row, Col, Button } from "antd";
import Search from "antd/es/transfer/search";
import Title from "antd/es/typography/Title";

const Authors = () => {
  return (
    <Flex vertical gap={"1rem"}>
      <Row justify={"space-between"}>
        <Col span={20}>
          <Flex gap={16} justify="start">
            <Col>
              <Title level={3} style={{ margin: 0 }}>
                Authors List
              </Title>
            </Col>
            <Col>
              <Search />
            </Col>
          </Flex>
        </Col>
        <Col>
          <Button>Add New Author</Button>
        </Col>
      </Row>
    </Flex>
  );
};

export default Authors;
