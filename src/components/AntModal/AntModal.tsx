import { App_MAIN_COLOR } from "@utils/consts";
import { Modal } from "antd";

interface IAntModalProps {
  title: React.ReactNode | string;
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  children: React.ReactNode;
  width?: string;
}

const AntModal = ({
  title,
  isModalOpen,
  handleOk,
  handleCancel,
  children,
  width,
}: IAntModalProps) => {
  return (
    <Modal
      title={
        <div
          style={{
            backgroundColor: App_MAIN_COLOR,
            padding: "1rem",
            borderRadius: "10px",
            color: "white",
            // width: "90%",
          }}
        >
          {title}
        </div>
      }
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width={width ? width : "600px"}
      style={{ overflowY: "auto" }}
      footer={true}
      closable={false}
    >
      {children}
    </Modal>
  );
};

export default AntModal;
