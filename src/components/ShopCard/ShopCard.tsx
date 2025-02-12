import { Card, Col, Flex, Row } from "antd";
import StoreInfo from "./SellButton/StoreInfo/StoreInfo";
interface ShopCardProps {
  bookCoverPage: string;
  title: string;
  authorName: string;
  storeName: string;
}
const storeBgColor = "#FFF6F1";
const bgColors = ["#FFEBE1", "#E1F4FF", "#E4E1FF", "#E1FFEB", "#FFFCE1"];

const ShopCard = ({
  bookCoverPage,
  title,
  authorName,
  storeName,
}: ShopCardProps) => {
  return (
    <Card bodyStyle={{ padding: "10px" }}>
      <Row gutter={16}>
        <Col
          span={8}
          style={{
            background: bgColors[Math.floor(Math.random() * bgColors.length)],
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          {bookCoverPage}
        </Col>
        <Col span={16}>
          <Row>
            <Col>{title}</Col>
            <Col>by {authorName}</Col>
          </Row>
          <Col>Stores</Col>
          <Flex gap={16}>
            <Col style={{ background: storeBgColor }} span={12}>
              <StoreInfo storeName={storeName} price="10" />
            </Col>
            <Col style={{ background: storeBgColor }} span={12}>
              <StoreInfo storeName={storeName} price="10" />
            </Col>
          </Flex>
        </Col>
      </Row>
    </Card>
  );
};

export default ShopCard;
