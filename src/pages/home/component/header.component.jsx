import React from "react";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./megamenu.css";

import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Button,
  FormControl,
} from "react-bootstrap";
import {
  FaBell,
  FaFacebook,
  FaInstagram,
  FaShoppingCart,
  FaTiktok,
  FaTwitter,
  FaUser,
} from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Navbar
        expand="lg"
        className=" justify-content-between"
        style={{
          backgroundColor: "#fcf6f2",
          color: "black",
          fontSize: "18px",
        }}
      >
        <Container fluid>
          <NavLink className={"navbar-brand"} to="/">
            Ordinary
          </NavLink>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search for products"
              className="me-2"
              aria-label="Search"
              style={{
                width: "500px",
                backgroundColor: "white",
                marginLeft: "10px",
              }}
            />
            <Button
              style={{
                backgroundColor: "#d9c584",
                color: "black",
                border: "1px solid black",
              }}
            >
              Search
            </Button>
          </Form>
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
          <Nav>
            <Link
              to="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "white",
                marginRight: "20px",
                marginLeft: "149px",
              }}
            >
              <FaFacebook size={20} color="black" />
            </Link>
            <Link
              to="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "white", marginRight: "20px" }}
            >
              <FaInstagram size={20} color="black" />
            </Link>
            <Link
              to="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "white", marginRight: "20px" }}
            >
              <FaTwitter size={20} color="black" />
            </Link>
            <Link
              to="https://www.tiktok.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginRight: "100px", color: "white" }}
            >
              <FaTiktok size={20} color="black" />
            </Link>
          </Nav>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <NavLink className={"nav-link"} to="/cart">
                <FaShoppingCart size={"20px"} color="black" />
              </NavLink>
              <NavLink className={"nav-link"} to="/notifications">
                <FaBell size={"20px"} color="black" />
              </NavLink>
              <NavDropdown
                title={<FaUser color="black" />}
                id="basic-nav-dropdown"
              >
                <Link className={"dropdown-item"} to="/login">
                  Login
                </Link>
                <Link className={"dropdown-item"} to="/register">
                  Register
                </Link>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <hr style={{ margin: "0", borderTop: "1px solid #333333" }} />
      <Navbar style={{ backgroundColor: "#fcf6f2" }}>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="navbarSupportedContent" className="collapse navbar-collapse">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item dropdown megamenu">
              <NavLink
                id="megamneu"
                href="#"
                // id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                className="nav-link dropdown-toggle font-weight-bold text-uppercase dropdown-toggle ms-auto"
                style={{ marginLeft: "auto" }}
              >
                Electronics
              </NavLink>
              <div
                aria-labelledby="dropdownMenuButton1"
                className="dropdown-menu border-0 p-0 m-0"
              >
                <div className="container">
                  <div className="row bg-white rounded-0 m-0 shadow-sm">
                    <div className="col-lg-7 col-xl-8">
                      <div className="p-4">
                        <div className="row">
                          <div className="col-lg-6 mb-4">
                            <h6 className="font-weight-bold text-uppercase">
                              Laptops
                            </h6>
                            <ul className="list-unstyled">
                              <li className="nav-item">
                                <NavLink
                                  to="/category/electronics/laptops/dell"
                                  className="nav-link text-small pb-0"
                                >
                                  Dell
                                </NavLink>
                              </li>
                              <li className="nav-item">
                                <NavLink
                                  to="/category/electronics/laptops/acer"
                                  className="nav-link text-small pb-0 "
                                >
                                  Acer
                                </NavLink>
                              </li>
                              <li className="nav-item">
                                <NavLink
                                  to="/category/electronics/laptops/lenevo"
                                  className="nav-link text-small pb-0 "
                                >
                                  Lenevo
                                </NavLink>
                              </li>
                              <li className="nav-item">
                                <NavLink
                                  href="/category/electronics/laptops/asus"
                                  className="nav-link text-small pb-0 "
                                >
                                  Asus
                                </NavLink>
                              </li>
                            </ul>
                          </div>
                          <div className="col-lg-6 mb-4">
                            <h6 className="font-weight-bold text-uppercase">
                              Fridges
                            </h6>
                            <ul className="list-unstyled">
                              <li className="nav-item">
                                <NavLink
                                  to="/category/electronics/fridges/LG"
                                  className="nav-link text-small pb-0 "
                                >
                                  LG
                                </NavLink>
                              </li>
                              <li className="nav-item">
                                <NavLink
                                  to="/category/electronics/fridges/samsung"
                                  className="nav-link text-small pb-0 "
                                >
                                  Samsung
                                </NavLink>
                              </li>
                              <li className="nav-item">
                                <NavLink
                                  to="/category/electronics/fridges/iim"
                                  className="nav-link text-small pb-0 "
                                >
                                  IIM
                                </NavLink>
                              </li>
                              <li className="nav-item">
                                <NavLink
                                  to="/category/electronics/fridges/haier"
                                  className="nav-link text-small pb-0 "
                                >
                                  Haier
                                </NavLink>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div class="col-lg-5 col-xl-4 px-0 d-none d-lg-block megaimaga"></div> */}
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <NavDropdown
                title="TV AND APPLIANCES"
                id="basic-nav-dropdown"
                style={{ marginLeft: "20px" }}
              >
                <Link className="dropdown-item" to="/category/tv/32-lcd">
                  32" LCD
                </Link>

                <Link className="dropdown-item" to="/category/tv/oled">
                  OLED Display
                </Link>
                <Link className="dropdown-item" to="/category/tv/samsungtv">
                  Samsung TV
                </Link>
                <Link className="dropdown-item" to="/category/tv/64lcd">
                  64" LCD
                </Link>
              </NavDropdown>
            </li>
            <li className="nav-item">
              <NavDropdown
                title="MEN"
                id="basic-nav-dropdown"
                style={{ marginLeft: "10px" }}
              >
                <Link className="dropdown-item" to="/category/men/pants">
                  Pants
                </Link>
                <Link className="dropdown-item" to="/category/men/hoodies">
                  Hoodies
                </Link>
                <Link className="dropdown-item" to="/category/men/footwear">
                  Footwear
                </Link>
                <Link className="dropdown-item" to="/category/men/caps">
                  Caps
                </Link>
              </NavDropdown>
            </li>
            <li className="nav-item">
              <NavDropdown
                title="FEMALE"
                id="basic-nav-dropdown"
                style={{ marginLeft: "10px" }}
              >
                <Link className="dropdown-item" to="/category/women/tops">
                  Tops
                </Link>
                <Link className="dropdown-item" to="/category/women/skirts">
                  Skirts
                </Link>
                <Link className="dropdown-item" to="/category/women/party-wear">
                  Party Wear
                </Link>
                <Link className="dropdown-item" to="/category/women/footwear">
                  Footwear
                </Link>
              </NavDropdown>
            </li>
            <li className="nav-item">
              <NavDropdown
                title="HOME AND FURNITURE"
                id="basic-nav-dropdown"
                style={{ marginLeft: "10px" }}
              >
                <Link className={"dropdown-item"} to="/category/home/decor">
                  Decor
                </Link>
                <Link className={"dropdown-item"} to="/category/home/sofa">
                  Sofa
                </Link>
                <Link className={"dropdown-item"} to="/category/home/curtains">
                  Curtains
                </Link>
                <Link className={"dropdown-item"} to="/category/home/kitchen">
                  Kitchen
                </Link>
              </NavDropdown>
            </li>
            <li className="nav-item">
              <NavDropdown
                title="BEAUTY AND MORE"
                id="basic-nav-dropdown"
                style={{ marginLeft: "10px" }}
              >
                <Link
                  className={"dropdown-item"}
                  to="/category/beauty/men-makeup"
                >
                  Men Makeup
                </Link>
                <Link
                  className={"dropdown-item"}
                  to="/category/beauty/women-makeup"
                >
                  Women Makeup
                </Link>
                <Link
                  className={"dropdown-item"}
                  to="/category/beauty/anti-aging"
                >
                  Anti Aging
                </Link>
                <Link
                  className={"dropdown-item"}
                  to="/category/beauty/skin-care"
                >
                  Skin Care
                </Link>
              </NavDropdown>
            </li>
          </ul>
        </div>
      </Navbar>
    </>
  );
};

export default Header;
