import { setIsLoading } from "@store/authSlice/authSlice";
import { useAppDispatch } from "@store/hooks";
import { addAuthorNamesToBooks } from "@utils/index";
import { notification } from "antd";
import { getBooks } from "apis/books";
import { useEffect, useState } from "react";
import { Book } from "types";

const useShop = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

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

  return { books, error };
};

export default useShop;
