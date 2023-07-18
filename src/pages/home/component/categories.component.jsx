import React from "react";
import { Card, Container } from "react-bootstrap";
import "./card.css";
import card1 from "../../../assets/images/card-1.jpg";
import card2 from "../../../assets/images/card-2.jpg";
import card3 from "../../../assets/images/card-3.jpg";
import card4 from "../../../assets/images/card-4.jpg";

const Categories = () => {
  return (
    <>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <h3>Best Sellers</h3>
      </Container>

      <Container style={{ display: "flex", flexWrap: "wrap" }}>
        <Container style={{ display: "flex", flexWrap: "wrap" }}>
          <Card style={{ width: "18rem", margin: "10px" }}>
            <Card.Img variant="top" src={card1} className="card-img" />
            <Card.Body>
              <Card.Title>Samsung Phones</Card.Title>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem", margin: "10px" }}>
            <Card.Img variant="top" src={card2} className="card-img" />
            <Card.Body>
              <Card.Title>Smart TV</Card.Title>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem", margin: "10px" }}>
            <Card.Img variant="top" src={card3} className="card-img" />
            <Card.Body>
              <Card.Title>Guitar</Card.Title>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem", margin: "10px" }}>
            <Card.Img variant="top" src={card4} className="card-img" />
            <Card.Body>
              <Card.Title>Sneakers</Card.Title>
            </Card.Body>
          </Card>
        </Container>
      </Container>
    </>
  );
};

export default Categories;
