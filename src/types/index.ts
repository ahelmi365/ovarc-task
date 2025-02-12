export interface Store {
  id: string;
  name: string;
  address_1: string;
  address_2: string | null;
  city: string;
  state: string;
  zip: string;
}

export interface Book {
  id: string;
  author_id: string;
  name: string;
  isbn: string;
  language: string;
  page_count: number;
  format: "paperback" | "hardcover" | "ebook";
  storeId: string;
  authorName: string;
}

export interface Author {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  nationality: string;
}

// Additional interfaces for related data
export interface BookWithAuthor extends Book {
  author: Author;
}

// Common response interfaces
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface BookDetails {
  name: string;
  author_id: string;
  page_count: number;
}
