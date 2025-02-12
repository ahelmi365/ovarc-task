export interface Store {
  id: number;
  name: string;
  address_1: string;
  address_2: string | null;
  city: string;
  state: string;
  zip: string;
}

export interface Book {
  id: number;
  author_id: number;
  name: string;
  isbn: string;
  language: string;
  page_count: number;
  format: "paperback" | "hardcover" | "ebook";
  storeId:number;
}

export interface Author {
  id: number;
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
