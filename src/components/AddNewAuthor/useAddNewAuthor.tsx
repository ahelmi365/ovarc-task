import { setIsLoading } from "@store/authSlice/authSlice";
import { useAppDispatch } from "@store/hooks";
import { notification } from "antd";
import { getAuthors } from "apis/authors";
import { useEffect, useState } from "react";
import { Author } from "types";

const useAddNewAuthor = () => {
  const dispatch = useAppDispatch();
  const [authors, setAuthors] = useState<Author[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      dispatch(setIsLoading(true));
      try {
        const data = await getAuthors();
        setAuthors(data);

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

  return authors;
};

export default useAddNewAuthor;
