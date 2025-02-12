# Ovarc BookShop App 📚🛍️✨

## Overview 📖🖥️🔄

Ovarc BookShop is a web application built with React, designed for public use by bookstores and print houses. It allows users to manage books, authors, and stores through 📝 CRUD operations. 🖥️📖🔄

## Features

### **Shop Page** 📚🏬🔍

- Displays a list of books with their cover image, title, author, and available stores.
- Includes a real-time search feature that updates results as the user types.

### **Authors Page** ✍️📑🔄

- Shows a list of authors with options to edit their names (🚧 feature to be implemented) or delete them.
- Includes a modal for adding new authors.
- Provides search functionality to find authors by first or last name.
- Supports sorting and filtering across all table columns.

### **Books Page** 📖📜📌

- Displays a list of books, showing the title, page count, and author.
- Includes an edit button to modify the book title (🚧 feature to be implemented) and a delete button to remove books from the store.
- Provides an option to add new books.
- Supports search by book title.
- Allows sorting and filtering of all table columns.

### **Stores Page** 🏢📍🗂️

- Lists all stores with their names and addresses.
- Includes an edit button to modify store details (🚧 feature to be implemented) and a delete button to remove stores.
- Provides an option to add new stores.
- Supports search by store name.
- Allows sorting and filtering of all table columns.

## Technologies Used 🚀💻⚙️

- **React** (for UI development)
- **TypeScript** (for type safety and better code maintainability)
- **State Management**: Redux, Redux-Toolkit, and redux-persist
- **UI Framework**: Ant Design
- **Build Tool**: 🏗️ Vite
- **Responsive Design** (ensures compatibility across different devices)

## Getting Started 🏁🔧📂

### Prerequisites 🏗️📌⚡

- Node.js (v22.12.0)
- npm or yarn (package managers)

### Installation 🔽📥🛠️

1. Clone the repository:
   ```bash
   git clone https://github.com/ahelmi365/ovarc-task.git
   ```
2. Navigate to the project directory and install dependencies:

   ```bash
   cd ovarc-task
   npm install
   ```

3. Start the application:
   - Run the backend server:
     ```bash
     npm run server
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```
     🚀🔥✅

### File Structure:📁

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
