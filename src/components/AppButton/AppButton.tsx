import { App_MAIN_COLOR } from "@utils/consts";
import { Button } from "antd";
interface AppButtonProps {
  onClick?: () => void;
  iconSrc?: string;
  buttonText?: string | React.ReactNode;
}
const AppButton = ({ onClick, buttonText, iconSrc }: AppButtonProps) => {
  return (
    <Button
      size="middle"
      style={{
        backgroundColor: App_MAIN_COLOR,
        borderColor: App_MAIN_COLOR,
        color: "White",
      }}
      onClick={onClick}
    >
      {iconSrc && (
        <img
          src={iconSrc ? iconSrc : ""}
          alt="Edit Book"
          title="Edit Book"
          width={15}
          height={15}
        />
      )}
      {buttonText ? buttonText : ""}
    </Button>
  );
};

export default AppButton;
