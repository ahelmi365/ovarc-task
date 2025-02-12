# Ovarc BookShop App

## Overview

This is a Bookshop application built using React (for web) for external public use where other bookstores or print houses can use it to perform CRUD operations on the books.

#### File Structure:

```
/ovarc-task
├── public
│   ├── index.html
│   └── ...
├── src
│   ├── apis
│   │   └── authors.ts
│   │   └── books.ts
│   │   └── stores.ts
│   ├── assets
│   │   ├── png
│   │   │   ├── ...
│   │   └── svg
│   │   │   ├── ...
│   ├── components
│   │   ├── AddNewAuthor
│   │   │   ├── AddNewAuthor.tsx
│   │   │   ├── useAddNewAuthor.tsx
│   │   ├── AddNewBook
│   │   │   ├── AddNewBook.tsx
│   │   │   ├── useAddNewBook.tsx
│   │   ├── AddNewStore
│   │   │   ├── AddNewStore.tsx
│   │   │   ├── useAddNewStore.tsx
│   │   ├── AntModal
│   │   │   ├── AntModal.tsx
│   │   ├── AppButton
│   │   │   ├── AppButton.tsx
│   │   └── ...
│   │   ├── Store
│   │   │   ├── StoreList.tsx
│   │   │   ├── StoreForm.tsx
│   │   │   └── ...
│   │   └── ...
│   ├── pages
│   │   ├── AuthorsPage
│   │   │    ├── AuthorsPage.tsx
│   │   │    ├── useAuthorsPage.tsx
│   │   ├── BooksPage
│   │   │    ├── BooksPage.tsx
│   │   │    ├── useBooksPage.tsx
│   │   ├── StoresPage
│   │   │    ├── StoresPage.tsx
│   │   │    ├── useStoresPage.tsx
│   │   ├── ShopPage
│   │   │   ├── ShopPage.tsx
│   │   │   ├── useShopPage.tsx
│   ├── store
│   │   ├── store.ts
│   │   ├── slices
│   │   │   ├── authorSlice.ts
│   │   │   └── ...
│   │   └── ...
│   ├── types
│   ├── utils
│   ├── App.tsx
│   ├── main.tsx
│   └── ...
├── package.json
├── tsconfig.json
└── ...
```

## Features

- **Shop Page**:

  - It has a list of cards containing the book cover page, title & author, and which stores this book is available in.
  - Search functionality that triggers while typing to find specific books.

- **Authors page**:

  - It has a simple list of authors and two CTAs to edit the name () or delete (t be implemented) the author entirely. There is a CTA & a modal too for adding a new author.
    - You can use the search input to search for Author first name or last name.
    - You can sort and filter all columns in the table.

- **Books page**

  - It has a list of books, with book name, the number of pages, and who the author is. The edit CTA to edit the book title (to be implemented) and the Delete buton to delete a book from the store.
  - There is also a button to add new Book to the store.
  - You can use the search input to search for book by book name.
  - You can sort and filter all columns in the table.

- **Stores page**:
  - It has a list of stores, with store name, the sore address. The edit CTA to edit the book title (to be implemented) and the Delete buton to delete a store.
  - There is also a button to add new Store.
  - You can use the search input to search for store by store name.
  - You can sort and filter all columns in the table.

## Technologies Used

- React
- TypeScript
- State Management (e.g., Redux, Redux-Toolkit, and redux-persist)
- Ant-Design
- Vite
- Responsive Design

## Getting Started

### Prerequisites

- Node.js (v22.12.0)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ahelmi365/ovarc-task.git
   ```
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the application:

   - Open New Terminal

     ```bash
     npm run server
     ```

   - Open New Terminal

     ```bash
     npm run dev
     ```
