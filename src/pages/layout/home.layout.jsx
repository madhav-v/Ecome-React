import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import Header from "../home/component/header.component";
import logo from "../../assets/images/logo1.png";
import { styled } from "styled-components";
import {
  Navbar,
  Container,
  Col,
  NavDropdown,
  Nav,
  ListGroup,
  Row,
} from "react-bootstrap";

const FooterComponent = styled.section`
    background-color: #dddddd
    min-height: 10px
`;

const HomePageLayout = () => {
  return (
    <>
      <Header />

      <Outlet />
      <Navbar expand="lg" className="bg-body-tertiary">
        <FooterComponent>
          <Container className="py-5">
            <Row className="my-0">
              <Col sm={12} md={4}>
                <img
                  src={logo}
                  style={{ width: "80%", height: "30%" }}
                  className="img img-fluid"
                ></img>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Laboriosam, hic earum, dolorum aut similique, obcaecati alias
                  nihil asperiores ipsum aliquam provident nesciunt perferendis
                  consequatur ea et voluptatum deleniti doloremque veniam? Lorem
                  ipsum dolor sit amet consectetur adipisicing elit. Quam nisi
                  qui adipisci porro iste nam ex? Non provident minus facilis
                  suscipit quia id. Accusantium eaque magni itaque nihil iusto
                  quae?
                </p>
              </Col>
              <Col sm={12} md={4}>
                <h4>Quick Actions</h4>
                <hr />
                <ListGroup>
                  <ListGroup.Item>
                    <NavLink className="nav-link" to="/about-us">
                      About Us
                    </NavLink>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <NavLink className="nav-link" to="/privacy-policy">
                      Privacy Policy
                    </NavLink>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <NavLink className="nav-link" to="/terms-and-conditions">
                      Terms and Conditions
                    </NavLink>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <NavLink className="nav-link" to="/delivery-policy">
                      Delivery Policy
                    </NavLink>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <NavLink className="nav-link" to="/feedback-link">
                      Feedback Links
                    </NavLink>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col sm={12} md={4}>
                <h4>Where we are</h4>

                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d220.74946024016475!2d85.34182783286757!3d27.717552920919708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjfCsDQzJzAzLjMiTiA4NcKwMjAnMzAuNSJF!5e0!3m2!1sen!2snp!4v1693915343387!5m2!1sen!2snp"
                  width="400"
                  height="300"
                  style={{ border: "0px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </Col>
            </Row>
          </Container>
        </FooterComponent>
      </Navbar>
    </>
  );
};

export default HomePageLayout;
