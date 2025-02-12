import { API_URL } from "@utils/consts";
import { handleResponse } from "@utils/index";
import { Store } from "types";

// READ - Get all books
export const getStores = async (): Promise<Store[]> => {
  const response = await fetch(`${API_URL}/stores`);
  return handleResponse(response);
};

// READ - Get single book
export const getStore = async (id: string): Promise<Store> => {
  const response = await fetch(`${API_URL}/stores/${id}`);
  return handleResponse(response);
};

// CREATE - Add new book
export const createStore = async (book: Omit<Store, "id">): Promise<Store> => {
  const response = await fetch(`${API_URL}/stores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
  return handleResponse(response);
};

// UPDATE - Update book
export const updateStore = async (
  id: string,
  book: Partial<Store>
): Promise<Store> => {
  const response = await fetch(`${API_URL}/stores/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
  return handleResponse(response);
};

// DELETE - Delete book
export const deleteStore = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/stores/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
};
