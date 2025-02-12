import useBooks from "@hooks/useBooks";
import React from "react";

const Books = () => {
  const { books, isLoading, error } = useBooks();
  return <div>Books</div>;
};

export default Books;
