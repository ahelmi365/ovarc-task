import ShopCard from "@components/ShopCard/ShopCard";
import useBooks from "@hooks/useBooks";
import { Row, Col } from "antd";
import React from "react";

const Shop = () => {
  const { books, isLoading, error } = useBooks();
  return (
    <Row gutter={16}>
      {books.slice(0, 10)?.map((book) => (
        <Col sm={24} md={12} lg={8} key={book.id}>
          <ShopCard
            title={book.name.slice(0, 20)}
            authorName={book.authorName}
            bookCoverPage={book.name.slice(0, 20)}
            storeName="store name"
          />
        </Col>
      ))}
    </Row>
  );
};

export default Shop;
