import { getAuthorName, getBooks } from "apis/books";
import { useEffect, useState } from "react";
import { Book } from "types";

const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addAuthorNamesToBooks = async (books: Book[]) => {
    const booksWithAuthorNames = await Promise.all(
      books.map(async (book) => {
        const authorName = await getAuthorName(book.author_id);
        console.log({ authorName });
        return { ...book, authorName };
      })
    );
    return booksWithAuthorNames;
  };

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const data = await getBooks();
        const booksWithAuthorNames = await addAuthorNamesToBooks(data);
        setBooks(booksWithAuthorNames);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return { books, isLoading, error };
};

export default useBooks;
