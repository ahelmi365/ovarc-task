import AntModal from "@components/AntModal/AntModal";
import AppButton from "@components/AppButton/AppButton";
import { Col, Flex, Row, Table } from "antd";
import Search from "antd/es/transfer/search";
import Title from "antd/es/typography/Title";
import { Store } from "types";
import useStores from "./useStores";

const Stores = () => {
  const {
    stores,
    columns,
    handleTableChange,
    pagination,
    modalTitle,
    modalBody,
    isModalOpen,
    handleOk,
    handleCancel,
    handleAddNewStore,
  } = useStores();
  return (
    <>
      <Flex vertical gap={"1rem"}>
        <Row justify={"space-between"}>
          <Col span={20}>
            <Flex gap={16} justify="start">
              <Col>
                <Title level={3} style={{ margin: 0 }}>
                  Stores List
                </Title>
              </Col>
              <Col>
                <Search />
              </Col>
            </Flex>
          </Col>
          <Col>
            <AppButton buttonText="Add New Store" onClick={handleAddNewStore} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table<Store>
              // scroll={{ x: 768 }}
              columns={columns}
              dataSource={stores}
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

export default Stores;
