import { Card, Col, Row } from "antd";

const ShopCard = () => {
  return (
    <Card>
      <Row>
        <Col span={8}>Book title side</Col>
        <Col span={16}>
          <Row>
            <Col>Book Title</Col>
            <Col>by autho name</Col>
          </Row>
          <Row>
            <span>Stores</span>
            <Col>
              <span>Store 1</span>
              <span>Price</span>
              <button>sell</button>
            </Col>
            <Col>
              <span>Store 1</span>
              <span>Price</span>
              <button>sell</button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default ShopCard;
