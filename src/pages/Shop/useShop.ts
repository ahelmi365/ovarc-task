import { setIsLoading } from "@store/authSlice/authSlice";
import { useAppDispatch } from "@store/hooks";
import { addAuthorNamesToBooks } from "@utils/index";
import { notification } from "antd";
import { getBooks } from "apis/books";
import { useEffect, useState } from "react";
import { Book } from "types";

const useShop = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredbooks, setFilteredBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchBooks = async () => {
      dispatch(setIsLoading(true));
      try {
        const data = await getBooks();
        const booksWithAuthorNames = await addAuthorNamesToBooks(data);
        setBooks(booksWithAuthorNames);
        setFilteredBooks(booksWithAuthorNames);
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const trimmedValue = value.trim();
    const newFilteredStores = books.filter((book) =>
      book.name.toLocaleLowerCase().includes(trimmedValue)
    );
    setFilteredBooks(newFilteredStores);
    if (trimmedValue === "") {
      setFilteredBooks(books);
    }
  };

  return { filteredbooks, error, handleInputChange };
};

export default useShop;
