import { setIsLoading } from "@store/authSlice/authSlice";
import { useAppDispatch } from "@store/hooks";
import { getAuthorName, getBooks } from "apis/books";
import { useEffect, useState } from "react";
import { Book } from "types";

const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const addAuthorNamesToBooks = async (books: Book[]) => {
    const booksWithAuthorNames = await Promise.all(
      books.map(async (book) => {
        const authorName = await getAuthorName(book.author_id);
        return { ...book, authorName };
      })
    );
    return booksWithAuthorNames;
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
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    fetchBooks();
  }, []);

  return { books, error };
};

export default useBooks;
