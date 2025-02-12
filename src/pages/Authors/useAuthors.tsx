import deleteIcon from "@assets/svg/deleteIcon.svg";
import editIcon from "@assets/svg/editIcon.svg";
import AddNewAuthor from "@components/AddNewAuthor/AddNewAuthor";
import { setIsLoading } from "@store/authSlice/authSlice";
import { useAppDispatch } from "@store/hooks";
import { App_MAIN_COLOR } from "@utils/consts";
import { generateTableFilters, onFilterTable, sortTable } from "@utils/index";
import {
  Button,
  Flex,
  notification,
  TableColumnsType,
  TablePaginationConfig,
} from "antd";
import { createAuthor, deleteAuthor, getAuthors } from "apis/authors";
import { useEffect, useState } from "react";
import { Author } from "types";

const useAuthors = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [filteredAuthors, setFilteredAuthors] = useState<Author[]>([]);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handleDeleteAuthor = async (id: string) => {
    dispatch(setIsLoading(true));
    try {
      await deleteAuthor(id);
      setAuthors((prevAuthors) =>
        prevAuthors.filter((author) => author.id !== id)
      );
      setFilteredAuthors((prevAuthors) =>
        prevAuthors.filter((author) => author.id !== id)
      );
      notification.success({ message: "Author deleted successfully" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      notification.error({
        message: "Failed to delete author, please try again",
      });
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    const fetchAuthors = async () => {
      dispatch(setIsLoading(true));
      try {
        const data = await getAuthors();
        setAuthors(data);
        setFilteredAuthors(data);

        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        notification.error({ message: "Network Error, please try again" });
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    fetchAuthors();
  }, []);

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
  });

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setPagination(newPagination);
  };

  const columns: TableColumnsType<Author> = [
    {
      title: "Author ID",
      dataIndex: "id",
      key: "id",
      fixed: "left",
      render: (_, record) => record.id,
      filters: generateTableFilters(authors, "id"),
      onFilter: (value, record) => onFilterTable(value, record, "id"),
      sorter: (a, b) => sortTable(a, b, "id"),
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filters: generateTableFilters(authors, "first_name"),
      onFilter: (value, record) => onFilterTable(value, record, "first_name"),
      sorter: (a, b) => sortTable(a, b, "first_name"),
      render: (_, record) => `${record.first_name} ${record.last_name}`,
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
              alt="Edit Author"
              title="Edit Author"
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
            onClick={() => handleDeleteAuthor(record.id)}
          >
            <img
              src={deleteIcon}
              alt="Edit Author"
              title="Delete Author"
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
  const onFinish = async (authorDetails: Omit<Author, "id">) => {
    dispatch(setIsLoading(true));
    try {
      const newAuthor = await createAuthor(authorDetails);
      console.log({ newAuthor });
      setAuthors((prevAuthors) => [newAuthor, ...prevAuthors]);
      setFilteredAuthors((prevAuthors) => [newAuthor, ...prevAuthors]);

      notification.success({ message: "Author added successfully" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      notification.error({
        message: "Failed to add author, please try again",
      });
    } finally {
      dispatch(setIsLoading(false));
    }

    console.log({ authorDetails });

    handleOk();
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAddNeAuthor = () => {
    setModalTitle("New Author");
    setModalBody(<AddNewAuthor onFinish={onFinish} onCancel={handleCancel} />);
    showModal();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const trimmedValue = value.trim();
    const newFilteredStores = authors.filter(
      (book) =>
        book.first_name.toLocaleLowerCase().includes(trimmedValue) ||
        book.last_name.toLocaleLowerCase().includes(trimmedValue)
    );
    setFilteredAuthors(newFilteredStores);
    if (trimmedValue === "") {
      setFilteredAuthors(authors);
    }
  };
  return {
    filteredAuthors,
    columns,
    handleTableChange,
    pagination,
    modalTitle,
    modalBody,
    isModalOpen,
    handleOk,
    handleCancel,
    handleAddNeAuthor,
    handleInputChange,
  };
};

export default useAuthors;
