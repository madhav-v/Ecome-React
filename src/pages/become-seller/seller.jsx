import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

function Seller() {
  return (
    <>
      <Navbar
        expand="lg"
        className="justify-content-between"
        style={{
          backgroundColor: "#fcf6f2",
          color: "black",
          fontSize: "18px",
        }}
      >
        <Container>
          <div className="d-flex align-items-center">
            <NavLink className={"navbar-brand"} to="/">
              Ordinary
            </NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavLink className="nav-link" to="/fee-structure">
                  Fee Structure
                </NavLink>
                <NavLink className="nav-link" to="/faqs">
                  FAQs
                </NavLink>
                <NavLink className="nav-link" to="/shopsy">
                  Shopsy
                </NavLink>
              </Nav>
            </Navbar.Collapse>
          </div>
          <div className="d-flex align-items-center">
            <NavLink to="/start-selling">
              <Button
                style={{
                  backgroundColor: "#4d687a",
                  border: "1px solid black",
                  borderRadius: "5px",
                }}
                className="ms-2"
              >
                Start Selling
              </Button>
            </NavLink>
          </div>
        </Container>
      </Navbar>

      <Container>
        <h1>We are Coming Soon</h1>
        <h3>Stay Tuned</h3>
      </Container>
    </>
  );
}

export default Seller;
