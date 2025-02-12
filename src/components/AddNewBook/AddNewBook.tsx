import { App_MAIN_COLOR } from "@utils/consts";
import {
  Button,
  Flex,
  Form,
  Input,
  InputNumber,
  notification,
  Select,
} from "antd";
import { BookDetails } from "types";
import useAddNewBook from "./useAddNewBook";

interface IAddNewDocumentProps {
  onFinish: (newDetails: BookDetails) => void;
  onCancel: () => void;
}
const AddNewBook = ({ onFinish, onCancel }: IAddNewDocumentProps) => {
  const authors = useAddNewBook();
  const authorNamesOptions = authors.map((author) => {
    return {
      value: author.id,
      label: `${author.first_name} ${author.last_name}`,
    };
  });
  const [form] = Form.useForm();

  const handleSubmitNewBookDetails = () => {
    onFinish({
      name: form.getFieldValue("bookName"),
      author_id: form.getFieldValue("authorId"),
      page_count: form.getFieldValue("numberOfPages"),
    });
    form.resetFields();

    return;
  };

  return (
    <div>
      <Form
        name="addNeBook"
        form={form}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={handleSubmitNewBookDetails}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Book name"
          name="bookName"
          rules={[
            { required: true, message: "This field is required!" },
            { min: 3, message: "At least 3 characters" },
          ]}
        >
          <Input placeholder="Enter Book Name" />
        </Form.Item>
        <Form.Item
          label="Number of Pages"
          name="numberOfPages"
          rules={[
            { required: true, message: "This field is required!" },
            // { min: 1, message: "At least 1" },
          ]}
        >
          <InputNumber
            placeholder="Enter number of pages"
            type="number"
            min={1}
          />
        </Form.Item>

        <Form.Item
          label="Please select the author name"
          name="authorId"
          rules={[{ required: true, message: "This field is required!" }]}
        >
          <Select
            // onChange={handleChangeSelectBookName}
            options={authorNamesOptions}
            placeholder="Select Document Name"
          />
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

export default AddNewBook;
