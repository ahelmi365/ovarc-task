import { Button } from "antd";
import cartIcon from "@assets/svg/cartIcon.svg";

const SellButton = () => {
  return (
    <Button
      type="primary"
      icon={<img src={cartIcon} alt="Cart Icon" />}
      iconPosition={"end"}
      size="small"
    >
      Sell
    </Button>
  );
};

export default SellButton;
