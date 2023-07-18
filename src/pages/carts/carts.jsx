import React from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function Cart() {
  return (
    <>
      <Container>
        <div className="row justify-content-center">
          <div className="col-lg-3" style={{ marginTop: "20px" }}>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Your Cart</Card.Title>
                <Card.Text>
                  <h2>Your basket is empty!</h2>
                  <p>Enjoy Up to 50% Savings on Grocery</p>
                </Card.Text>
                <Button variant="primary" as={Link} to="/">
                  Shop Now
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Cart;
