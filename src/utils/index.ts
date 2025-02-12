import { getAuthorName } from "apis/books";
import { Book } from "types";

// Helper function to handle fetch responses
export const handleResponse = async (response: Response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const generateTableFilters = <T>(
  allRcords: T[],
  columnName: keyof T
) => {
  if (allRcords.length > 0) {
    const uniqueValues = [
      ...new Set(allRcords?.map((record) => record[columnName])),
    ];
    const filters = uniqueValues
      .filter((value) => value != undefined)
      .map((value) => {
        // return { text: (value as string).toString(), value };
        return { text: value, value };
      });

    return filters;
  }
  return [];
};

export const onFilterTable = <T>(
  value: boolean | React.Key,
  record: T,
  columnName: keyof T
) => {
  return record[columnName] === value;
};

export const sortTable = <T>(a: T, b: T, columnName: keyof T) => {
  const valueA = a[columnName];
  const valueB = b[columnName];

  if (typeof valueA === "string" && typeof valueB === "string") {
    return valueA.localeCompare(valueB);
  }

  return 0;
};

export const addAuthorNamesToBooks = async (books: Book[]) => {
  const booksWithAuthorNames = await Promise.all(
    books.map(async (book) => {
      const authorName = await getAuthorName(book.author_id);
      return { ...book, authorName };
    })
  );
  return booksWithAuthorNames;
};

export function debounce<T extends (...args: string[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return function (...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
