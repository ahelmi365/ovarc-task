import { API_URL } from "@utils/consts";
import { handleResponse } from "@utils/index";
import { Author } from "types";

// READ - Get all books
export const getAuthors = async (): Promise<Author[]> => {
  const response = await fetch(`${API_URL}/authors`);
  return handleResponse(response);
};

// READ - Get single book
export const getAuthor = async (id: number): Promise<Author> => {
  const response = await fetch(`${API_URL}/authors/${id}`);
  return handleResponse(response);
};

// CREATE - Add new book
export const createAuthor = async (
  book: Omit<Author, "id">
): Promise<Author> => {
  const response = await fetch(`${API_URL}/authors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
  return handleResponse(response);
};

// UPDATE - Update book
export const updateAuthor = async (
  id: number,
  book: Partial<Author>
): Promise<Author> => {
  const response = await fetch(`${API_URL}/authors/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
  return handleResponse(response);
};

// DELETE - Delete book
export const deleteAuthor = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/authors/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
};
