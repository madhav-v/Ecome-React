import React from "react";
import { NavLink } from "react-router-dom";

import { Col, Card, Badge } from "react-bootstrap";

const SingleProductListGrid = ({ product }) => {
  const firstImage =
    product.images && product.images.length > 0 ? product.images[0] : null;

  return (
    <>
      <Col sm={6} md={4} lg={3} className="mb-3">
        <Card>
          <Card.Img
            src={import.meta.env.VITE_IMAGE_URL + "/products/" + firstImage}
          ></Card.Img>
          <Card.Body>
            <NavLink
              to={`/product/` + product.slug}
              style={{ textDecoration: "none", cursor: "pointer" }}
            >
              <h4
                style={{
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                {product.name}
              </h4>
            </NavLink>
            <p>
              <span>NPR. {product.afterDiscount}</span>
              {product.discount && (
                <del className="mx-3 text-danger">Npr. {product.price}</del>
              )}
            </p>
            <p>
              <NavLink to="/brand/apple" className={"me-3"}>
                <Badge bg="info">{product.brand.name}</Badge>
              </NavLink>

              {product.categories &&
                product.categories.map((cat) => (
                  <NavLink
                    key={cat._id}
                    to={`/category/${cat.slug}`}
                    className={"me-3"}
                  >
                    <Badge bg="warning">{cat.name}</Badge>
                  </NavLink>
                ))}
            </p>
            <NavLink
              to={`/product/` + product.slug}
              className={"btn btn-sm btn-warning text-white"}
            >
              View More
            </NavLink>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default SingleProductListGrid;
