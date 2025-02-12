import deleteIcon from "@assets/svg/deleteIcon.svg";
import editIcon from "@assets/svg/editIcon.svg";
import AddNewBook from "@components/AddNewBook/AddNewBook";
import { setIsLoading } from "@store/authSlice/authSlice";
import { useAppDispatch } from "@store/hooks";
import { App_MAIN_COLOR } from "@utils/consts";
import {
  addAuthorNamesToBooks,
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
import { createBook, deleteBook, getAuthorName, getBooks } from "apis/books";
import { useEffect, useState } from "react";
import { Book, BookDetails } from "types";

const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handleDeleteBook = async (id: string) => {
    dispatch(setIsLoading(true));
    try {
      await deleteBook(id);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      notification.success({ message: "Book deleted successfully" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      notification.error({
        message: "Failed to delete book, please try again",
      });
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      dispatch(setIsLoading(true));
      try {
        const data = await getBooks();
        const booksWithAuthorNames = await addAuthorNamesToBooks(data);
        setBooks(booksWithAuthorNames);

        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        notification.error({ message: "Network Error, please try again" });
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    fetchBooks();
  }, []);

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
  });

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setPagination(newPagination);
  };

  const columns: TableColumnsType<Book> = [
    {
      title: "Book ID",
      dataIndex: "id",
      key: "id",
      fixed: "left",
      render: (_, record) => record.id,
      filters: generateTableFilters(books, "id"),
      onFilter: (value, record) => onFilterTable(value, record, "id"),
      sorter: (a, b) => sortTable(a, b, "id"),
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filters: generateTableFilters(books, "name"),
      onFilter: (value, record) => onFilterTable(value, record, "name"),
      sorter: (a, b) => sortTable(a, b, "name"),
      render: (_, record) =>
        `${record.name.charAt(0).toUpperCase()}${record.name.slice(1)}`,
    },
    {
      title: "Pages",
      dataIndex: "pages",
      key: "pages",
      render: (_, record) => record.page_count,
      filters: generateTableFilters(books, "page_count"),
      onFilter: (value, record) => onFilterTable(value, record, "page_count"),
      sorter: (a, b) => sortTable(a, b, "page_count"),
    },
    {
      title: "Author Name",
      dataIndex: "authorName",
      key: "authorName",
      render: (_, record) => record.authorName,
      filters: generateTableFilters(books, "authorName"),
      onFilter: (value, record) => onFilterTable(value, record, "authorName"),
      sorter: (a, b) => sortTable(a, b, "authorName"),
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
            //   onClick={() => handleViewRequestDetails(record)}
          >
            <img
              src={editIcon}
              alt="Edit Book"
              title="Edit Book"
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
            onClick={() => handleDeleteBook(record.id)}
          >
            <img
              src={deleteIcon}
              alt="Edit Book"
              title="Delete Book"
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
  const onFinish = async (bookDetails: BookDetails) => {
    dispatch(setIsLoading(true));
    try {
      const newBook = await createBook(bookDetails);
      const authorNameOfNewBook = await getAuthorName(newBook.author_id);
      console.log({ authorNameOfNewBook });
      setBooks((prevBooks) => [
        { ...newBook, authorName: authorNameOfNewBook },
        ...prevBooks,
      ]);

      notification.success({ message: "Book added successfully" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      notification.error({
        message: "Failed to add book, please try again",
      });
    } finally {
      dispatch(setIsLoading(false));
    }

    console.log({ bookDetails });

    handleOk();
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAddNewBook = () => {
    setModalTitle("New Book");
    setModalBody(<AddNewBook onFinish={onFinish} onCancel={handleCancel} />);
    showModal();
  };

  return {
    books,
    columns,
    handleTableChange,
    pagination,
    modalTitle,
    modalBody,
    isModalOpen,
    handleOk,
    handleCancel,
    handleAddNewBook,
  };
};

export default useBooks;
