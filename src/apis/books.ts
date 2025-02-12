import { API_URL } from "@utils/consts";
import { Book } from "types";

// Helper function to handle fetch responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// READ - Get all books
export const getBooks = async (): Promise<Book[]> => {
  const response = await fetch(`${API_URL}/books`);
  return handleResponse(response);
};

// READ - Get single book
export const getBook = async (id: number): Promise<Book> => {
  const response = await fetch(`${API_URL}/books/${id}`);
  return handleResponse(response);
};

// CREATE - Add new book
export const createBook = async (book: Omit<Book, "id">): Promise<Book> => {
  const response = await fetch(`${API_URL}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
  return handleResponse(response);
};

// UPDATE - Update book
export const updateBook = async (
  id: number,
  book: Partial<Book>
): Promise<Book> => {
  const response = await fetch(`${API_URL}/books/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
  return handleResponse(response);
};

// DELETE - Delete book
export const deleteBook = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/books/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
};
