import deleteIcon from "@assets/svg/deleteIcon.svg";
import editIcon from "@assets/svg/editIcon.svg";
import AddNewStore from "@components/AddNewStore/AddNewStore";
import { setIsLoading } from "@store/authSlice/authSlice";
import { useAppDispatch } from "@store/hooks";
import { App_MAIN_COLOR } from "@utils/consts";
import {
  debounce,
  generateTableFilters,
  onFilterTable,
  sortTable,
} from "@utils/index";
import {
  Button,
  Flex,
  notification,
  TableColumnsType,
  TablePaginationConfig,
} from "antd";
import { createStore, deleteStore, getStores } from "apis/stores";
import { useCallback, useEffect, useState } from "react";
import { Store } from "types";

const useStore = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handleDeleteStore = async (id: string) => {
    dispatch(setIsLoading(true));
    try {
      await deleteStore(id);
      setStores((prevStores) => prevStores.filter((store) => store.id !== id));
      setFilteredStores((prevStores) =>
        prevStores.filter((store) => store.id !== id)
      );
      notification.success({ message: "Store deleted successfully" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      notification.error({
        message: "Failed to delete store, please try again",
      });
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const trimmedValue = value.trim();
    const newFilteredStores = stores.filter((store) =>
      store.name.toLocaleLowerCase().includes(trimmedValue)
    );
    setFilteredStores(newFilteredStores);
    if (trimmedValue === "") {
      setFilteredStores(stores);
    }
  };
  useEffect(() => {
    const fetchStores = async () => {
      dispatch(setIsLoading(true));
      try {
        const data = await getStores();
        setStores(data);
        setFilteredStores(data);

        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        notification.error({ message: "Network Error, please try again" });
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    fetchStores();
  }, [dispatch]);

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
  });

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setPagination(newPagination);
  };

  const columns: TableColumnsType<Store> = [
    {
      title: "Store ID",
      dataIndex: "id",
      key: "id",
      fixed: "left",
      render: (_, record) => record.id,
      filters: generateTableFilters(stores, "id"),
      onFilter: (value, record) => onFilterTable(value, record, "id"),
      sorter: (a, b) => sortTable(a, b, "id"),
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filters: generateTableFilters(stores, "name"),
      onFilter: (value, record) => onFilterTable(value, record, "name"),
      sorter: (a, b) => sortTable(a, b, "name"),
      render: (_, record) => record.name,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      filters: generateTableFilters(stores, "address_1"),
      onFilter: (value, record) => onFilterTable(value, record, "address_1"),
      sorter: (a, b) => sortTable(a, b, "address_1"),
      render: (_, record) => record.address_1,
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Flex gap={16}>
          <Button
            size="middle"
            // variant="outlined"
            style={{
              backgroundColor: App_MAIN_COLOR,
              borderColor: App_MAIN_COLOR,
              color: App_MAIN_COLOR,
            }}
          >
            <img
              src={editIcon}
              alt="Edit Store"
              title="Edit Store"
              width={15}
              height={15}
            />
          </Button>
          <Button
            size="middle"
            style={{
              backgroundColor: App_MAIN_COLOR,
              borderColor: App_MAIN_COLOR,
              color: App_MAIN_COLOR,
            }}
            onClick={() => handleDeleteStore(record.id)}
          >
            <img
              src={deleteIcon}
              alt="Edit Store"
              title="Delete Store"
              width={15}
              height={15}
            />
          </Button>
        </Flex>
      ),
      fixed: "right",
    },
  ];

  //   handle modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState<React.ReactNode>();
  const [modalBody, setModalBody] = useState<React.ReactNode>();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const onFinish = async (storeDetails: Omit<Store, "id">) => {
    dispatch(setIsLoading(true));
    try {
      const newStore = await createStore(storeDetails);
      console.log({ newStore });
      setStores((prevStores) => [newStore, ...prevStores]);
      setFilteredStores((prevStores) => [newStore, ...prevStores]);

      notification.success({ message: "Store added successfully" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      notification.error({
        message: "Failed to add author, please try again",
      });
    } finally {
      dispatch(setIsLoading(false));
    }

    console.log({ storeDetails });

    handleOk();
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAddNewStore = () => {
    setModalTitle("New Store");
    setModalBody(<AddNewStore onFinish={onFinish} onCancel={handleCancel} />);
    showModal();
  };

  return {
    filteredStores,
    columns,
    handleTableChange,
    pagination,
    modalTitle,
    modalBody,
    isModalOpen,
    handleOk,
    handleCancel,
    handleAddNewStore,
    handleInputChange,
  };
};

export default useStore;
