import React, { useCallback, useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import category from "../../admin/category";
import product from "../../admin/product";
import SingleProductListGrid from "./single-product-list-grid.component";
import brand from "../../admin/brand";
import { Link } from "react-router-dom";

const Categories = () => {
  const [cats, setCats] = useState();
  const [brands, setBrands] = useState();
  const loadCategories = useCallback(async () => {
    let response = await category.categorySvc.listAllHomeCategories(5, 1);
    setCats(response.result);
  }, []);

  const loadBrands = useCallback(async () => {
    let response = await brand.brandSvc.listAllHomeBrands(5, 1);
    setBrands(response.result);
  }, []);
  const [productList, setProductList] = useState();

  const loadProducts = useCallback(async () => {
    let response = await product.productSvc.listHomeProducts(15, 1);
    setProductList(response.result);
  }, []);

  useEffect(() => {
    loadCategories();
    loadBrands();
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
                  <Link
                    to={`/category/${category.slug}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Card.Img
                      variant="top"
                      style={{ height: "100px" }}
                      src={
                        import.meta.env.VITE_IMAGE_URL +
                        "/category/" +
                        category.image
                      }
                    ></Card.Img>
                    <Card.Title>{category.name}</Card.Title>
                  </Link>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>

      <Container fluid className="my-5 bg-light">
        <Row className="p-3">
          <Col>
            <h4>Brand List</h4>
          </Col>
        </Row>
        <Row className="my-3 bg-light">
          {brands &&
            brands.map((brand, index) => (
              <Col sm={6} md={4} lg={2} className="mb-3" key={index}>
                <Card>
                  <Link
                    to={`/brand/${brand.slug}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Card.Img
                      variant="top"
                      style={{ height: "100px" }}
                      src={
                        import.meta.env.VITE_IMAGE_URL + "/brand/" + brand.image
                      }
                    ></Card.Img>
                    <Card.Title>{brand.name}</Card.Title>
                  </Link>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>

      <Container fluid className="my-5 bg-light">
        <Row className="p-3">
          <Col>
            <h4>Products</h4>
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
