import { App_MAIN_COLOR } from "@utils/consts";
import { Button, Flex, Form, Input } from "antd";
import { Store } from "types";

interface IAddNewStoreProps {
  onFinish: (newDetails: Omit<Store, "id">) => void;
  onCancel: () => void;
}
const AddNewStore = ({ onFinish, onCancel }: IAddNewStoreProps) => {
  const [form] = Form.useForm();

  const handleSubmitNewStoreDetails = () => {
    onFinish({
      name: form.getFieldValue("storeName"),
      address_1: form.getFieldValue("storeAddress"),
      address_2: "",
      city: "",
      state: "",
      zip: "",
    });
    form.resetFields();

    return;
  };

  return (
    <div>
      <Form
        name="addNewStore"
        form={form}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={handleSubmitNewStoreDetails}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Store Name"
          name="storeName"
          rules={[
            { required: true, message: "This field is required!" },
            { min: 3, message: "At least 3 characters" },
          ]}
        >
          <Input placeholder="Enter Store Name" />
        </Form.Item>
        <Form.Item
          label="Address"
          name="storeAddress"
          rules={[
            { required: true, message: "This field is required!" },
            { min: 3, message: "At least 3 characters" },
          ]}
        >
          <Input placeholder="Enter store address" />
        </Form.Item>

        <Flex justify="end" gap={16}>
          <Form.Item
            label={null}
            style={{ display: "flex", justifyContent: "end" }}
          >
            <Button
              variant="outlined"
              htmlType="reset"
              style={{
                borderColor: App_MAIN_COLOR,
                color: App_MAIN_COLOR,
              }}
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Form.Item>
          <Form.Item
            label={null}
            style={{ display: "flex", justifyContent: "end" }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: App_MAIN_COLOR,
                borderColor: App_MAIN_COLOR,
                color: "White",
              }}
            >
              Submit
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </div>
  );
};

export default AddNewStore;
