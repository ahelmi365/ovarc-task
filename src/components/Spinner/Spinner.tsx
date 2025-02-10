import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";

const Spinner = () => {
  return (
    <Flex align="center" gap="middle">
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
        fullscreen
      />
    </Flex>
  );
};

export default Spinner;
