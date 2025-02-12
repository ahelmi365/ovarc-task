import { Flex } from "antd";
import SellButton from "../SellButton";
interface StoreInfoProps {
  storeName: string;
  price: string;
}

const StoreInfo = ({ storeName, price }: StoreInfoProps) => {
  return (
    <Flex
      vertical
      gap={8}
      justify="center"
      align="center"
      style={{ padding: "7px", borderRadius: "5px", textAlign: "center" }}
    >
      <div>{storeName}</div>
      <div style={{ color: "#E9692C", fontWeight: "bold" }}>${price}</div>
      <SellButton />
    </Flex>
  );
};

export default StoreInfo;
