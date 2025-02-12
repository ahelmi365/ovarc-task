import { Flex, Row, Col, Button, Table } from "antd";
import Search from "antd/es/transfer/search";
import Title from "antd/es/typography/Title";
import { Book } from "types";
import useBooks from "./useBooks";
const Books = () => {
  const { columns, books, handleTableChange, pagination } = useBooks();
  return (
    <Flex vertical gap={"1rem"}>
      <Row justify={"space-between"}>
        <Col span={20}>
          <Flex gap={16} justify="start">
            <Col>
              <Title level={3} style={{ margin: 0 }}>
                Books List
              </Title>
            </Col>
            <Col>
              <Search />
            </Col>
          </Flex>
        </Col>
        <Col>
          <Button>Add New Book</Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table<Book>
            // scroll={{ x: 768 }}
            columns={columns}
            dataSource={books}
            rowKey={(record) => record.id}
            pagination={{
              ...pagination,
              showTotal: (total) => `Total ${total} records`,
            }}
            onChange={handleTableChange}
            tableLayout="auto"
          />
        </Col>
      </Row>
    </Flex>
  );
};

export default Books;
