import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <Container className="my-5">
        <p>404 Not Found</p>
        <Row>
          <Col>
            <p>
              Click
              <NavLink to="/"> Home</NavLink> to go back to Home page
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ErrorPage;
