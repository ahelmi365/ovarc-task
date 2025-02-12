import { App_MAIN_COLOR } from "@utils/consts";
import { Button, Flex, Form, Input } from "antd";
import { Author } from "types";

interface IAddNewAuthorProps {
  onFinish: (newDetails: Omit<Author, "id">) => void;
  onCancel: () => void;
}
const AddNewAuthor = ({ onFinish, onCancel }: IAddNewAuthorProps) => {
  const [form] = Form.useForm();

  const handleSubmitNewAuthorDetails = () => {
    onFinish({
      first_name: form.getFieldValue("firstName"),
      last_name: form.getFieldValue("lastName"),
      email: "",
      nationality: "",
    });
    form.resetFields();

    return;
  };

  return (
    <div>
      <Form
        name="addNewAuthor"
        form={form}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={handleSubmitNewAuthorDetails}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            { required: true, message: "This field is required!" },
            { min: 3, message: "At least 3 characters" },
          ]}
        >
          <Input placeholder="Enter First Name" />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            { required: true, message: "This field is required!" },
            { min: 3, message: "At least 3 characters" },
          ]}
        >
          <Input placeholder="Enter Last Name" />
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

export default AddNewAuthor;
