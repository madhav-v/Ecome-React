import React, { useCallback, useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import category from "../../admin/category";
import product from "../../admin/product";
import SingleProductListGrid from "./single-product-list-grid.component";

const Categories = () => {
  const [cats, setCats] = useState();
  const loadCategories = useCallback(async () => {
    let response = await category.categorySvc.listAllHomeCategories(20, 1);
    setCats(response.result);
  }, []);

  const [productList, setProductList] = useState();

  const loadProducts = useCallback(async () => {
    let response = await product.productSvc.listHomeProducts(24, 1);
    setProductList(response.result);
  }, []);

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);

  return (
    <>
      <Container fluid className="my-5 bg-light">
        <Row className="p-3">
          <Col>
            <h4>Category List</h4>
          </Col>
        </Row>
        <Row className="my-3 bg-light">
          {cats &&
            cats.map((category, index) => (
              <Col sm={6} md={4} lg={2} className="mb-3" key={index}>
                <Card>
                  <Card.Img
                    variant="top"
                    src={
                      import.meta.env.VITE_IMAGE_URL +
                      "/category/" +
                      category.image
                    }
                    style={{ width: "100%", height: "300px" }}
                  ></Card.Img>
                  <Card.Title>{category.name}</Card.Title>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>

      <Container fluid className="my-5 bg-light">
        <Row className="py-5">
          <Col>
            <h4 className="text-center">Products</h4>
          </Col>
        </Row>
        <Row>
          {productList &&
            productList.map((prod, index) => (
              <SingleProductListGrid key={index} product={prod} />
            ))}
        </Row>
      </Container>
    </>
  );
};

export default Categories;
