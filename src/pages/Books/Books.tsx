import AntModal from "@components/AntModal/AntModal";
import AppButton from "@components/AppButton/AppButton";
import { Col, Flex, Row, Table } from "antd";
import Search from "antd/es/transfer/search";
import Title from "antd/es/typography/Title";
import { Book } from "types";
import useBooks from "./useBooks";
const Books = () => {
  const {
    filteredBooks,
    columns,
    handleTableChange,
    pagination,
    modalTitle,
    modalBody,
    isModalOpen,
    handleOk,
    handleCancel,
    handleAddNewBook,
    handleInputChange,
  } = useBooks();
  return (
    <>
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
                <Search
                  onChange={handleInputChange}
                  placeholder="Search by Book Name"
                />
              </Col>
            </Flex>
          </Col>
          <Col>
            {/* <Button>Add New Book</Button> */}
            <AppButton buttonText="Add New Book" onClick={handleAddNewBook} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table<Book>
              // scroll={{ x: 768 }}
              columns={columns}
              dataSource={filteredBooks}
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
      <AntModal
        title={modalTitle}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
      >
        {modalBody}
      </AntModal>
    </>
  );
};

export default Books;
