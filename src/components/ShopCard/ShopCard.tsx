import { Card, Col, Flex, Row } from "antd";
import StoreInfo from "./SellButton/StoreInfo/StoreInfo";
import Title from "antd/es/typography/Title";
import GraySpan from "@components/GraySpan/GraySpan";
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
    <Card>
      <Row gutter={16}>
        <Col
          span={8}
          style={{
            background: bgColors[Math.floor(Math.random() * bgColors.length)],
            padding: "7px",
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "12px",
            textAlign: "center",
          }}
        >
          {bookCoverPage.charAt(0).toUpperCase() + title.slice(1)}
        </Col>
        <Col span={16}>
          <Col>
            <Title level={5} style={{ margin: "0" }}>
              {title.charAt(0).toUpperCase() + title.slice(1)}
            </Title>
          </Col>
          <Col>
            <GraySpan>By:{authorName}</GraySpan>
          </Col>

          <Col style={{ marginTop: "10px" }}>
            <GraySpan>Stores</GraySpan>
          </Col>
          <Flex gap={16}>
            <Col style={{ background: storeBgColor }} span={12}>
              <StoreInfo storeName={storeName} price="10" />
            </Col>
            <Col style={{ background: storeBgColor }} span={12}>
              <StoreInfo
                storeName={storeName}
                price={(Math.random() * 20 + 5).toFixed(2)}
              />
            </Col>
          </Flex>
        </Col>
      </Row>
    </Card>
  );
};

export default ShopCard;
