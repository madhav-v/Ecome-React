import React, { useCallback, useEffect, useState } from "react";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./megamenu.css";
import category from "../../admin/category";
import brand from "../../admin/brand";
import "./search.css";
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
  FaFacebook,
  FaInstagram,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SingleProductListGrid from "./single-product-list-grid.component";

const Header = () => {
  let loggedinUser = useSelector((root) => {
    return root.User.loggedInUser;
  });

  const cartQty = useSelector((root) => {
    let cartData = root.cart.cart;
    let qty = 0;
    if (cartData) {
      cartData.map((item) => {
        qty += Number(item.qty);
      });
    }
    return qty;
  });

  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    toast.success("Thank you for using our system");
    navigate("/login");
  };
  const [searchQuery, setSearchQuery] = useState();
  const [searchResult, setSearchResults] = useState();
  const [cats, setCats] = useState();
  const [brands, setBrands] = useState();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      let response = await category.categorySvc.searchItems(searchQuery);
      if (response && response.result.length > 0) {
        setSearchResults(response.result);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      // Handle network errors or other exceptions here
      console.error("Error:", error);
    }
  };
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchQuery(inputValue);
    if (!inputValue) {
      setSearchResults([]); // Clear the search results
    }
  };

  const loadCategories = useCallback(async () => {
    try {
      let response = await category.categorySvc.listAllHomeCategories(20, 1);

      if (response && response.result) {
        setCats(response.result);
      }
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  }, []);

  const loadBrands = useCallback(async () => {
    try {
      let response = await brand.brandSvc.listAllHomeBrands(20, 1);
      if (response && response.result) {
        setBrands(response.result);
      }
    } catch (error) {
      console.error("Error loading brands:", error);
    }
  }, []);

  useEffect(() => {
    loadCategories();
    loadBrands();
  }, []);

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
          <Form className="d-flex" onSubmit={handleSearch}>
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
              value={searchQuery}
              onChange={handleInputChange}
            />

            <Button
              type="submit"
              style={{
                backgroundColor: "#d9c584",
                color: "black",
                border: "1px solid black",
              }}
            >
              Search
            </Button>
          </Form>
          <NavDropdown
            title="Categories"
            id="categories"
            style={{ paddingLeft: "100px" }}
          >
            {cats &&
              cats.map((cat, index) => (
                <NavLink
                  key={index}
                  to={`/category/${cat.slug}`}
                  className={"dropdown-item"}
                >
                  {cat.name}
                </NavLink>
              ))}
          </NavDropdown>
          <NavDropdown
            title="Brands"
            id="brands"
            style={{ marginLeft: "10px" }}
          >
            {brands &&
              brands.map((brand, index) => (
                <NavLink
                  key={index}
                  to={`/brand/${brand.slug}`}
                  className={"dropdown-item"}
                >
                  {brand.name}
                </NavLink>
              ))}
          </NavDropdown>
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
          </Nav>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <NavLink className={"nav-link"} to="/cart">
                <FaShoppingCart size={"20px"} color="black" /> ({cartQty ?? ""})
              </NavLink>

              {loggedinUser ? (
                <>
                  <NavDropdown
                    title={<FaUser color="black" />}
                    id="basic-nav-dropdown"
                  >
                    <Link
                      onClick={logout}
                      className={"dropdown-item"}
                      to="/login"
                    >
                      Logout
                    </Link>
                  </NavDropdown>
                </>
              ) : (
                <>
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
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <hr style={{ margin: "0", borderTop: "1px solid #333333" }} />
      <div className="search-results-container">
      {searchResult && searchResult.length > 0 && (
        <div className="search-results">
          {searchResult.map((search, index) => (
            <SingleProductListGrid key={index} product={search} />
          ))}
        </div>
      )}
      </div>
     
    </>
  );
};

export default Header;
