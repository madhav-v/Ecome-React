import React from "react";
import {
  FaAngleDown,
  FaBars,
  FaDollarSign,
  FaHome,
  FaImages,
  FaProductHunt,
  FaShoppingBag,
  FaSquarespace,
  FaStreetView,
  FaTags,
  FaUsers,
} from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import noUser from "../../assets/images/no-user.png";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export const AdminTopNav = () => {
  const toggleSidebar = (e) => {
    e.preventDefault();
    document.body.classList.toggle("sb-sidenav-toggled");
  };
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

  return (
    <>
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark fixed-top">
        <NavLink className="navbar-brand ps-3" to="/admin">
          Admin Panel
        </NavLink>

        <button
          onClick={toggleSidebar}
          className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
          id="sidebarToggle"
          href="#!"
        >
          <FaBars color="white" />
        </button>

        <div className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0"></div>
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={noUser}
                alt=""
                style={{
                  marginLeft: "10px",
                  width: "30px",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  padding: "1px",
                }}
              />
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <Link className="dropdown-item" to="/settings">
                  Edit Profile
                </Link>
              </li>
              <li></li>
              <li>
                <NavLink onClick={logout} className="dropdown-item" to="/login">
                  Logout
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );
};

export const AdminSidebar = () => {
  let loggedinUser = useSelector((root) => {
    return root.User.loggedInUser;
  });

  return (
    <>
      <div id="layoutSidenav_nav">
        <nav
          className="sb-sidenav accordion sb-sidenav-dark"
          id="sidenavAccordion"
        >
          <div className="sb-sidenav-menu">
            <div className="nav">
              <div className="sb-sidenav-menu-heading">Core</div>
              <NavLink className="nav-link" to="/">
                <div className="sb-nav-link-icon">
                  <FaHome></FaHome>
                </div>
                Web Preview
              </NavLink>
              <div className="sb-sidenav-menu-heading">Core Feature</div>
              <a
                className="nav-link collapsed"
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#banner"
                aria-expanded="false"
                aria-controls="banner"
              >
                <div className="sb-nav-link-icon">
                  <FaImages />
                </div>
                Banner Mangement
                <div className="sb-sidenav-collapse-arrow">
                  <FaAngleDown />
                </div>
              </a>
              <div
                className="collapse"
                id="banner"
                aria-labelledby="headingOne"
                data-bs-parent="#sidenavAccordion"
              >
                <nav className="sb-sidenav-menu-nested nav">
                  <NavLink className="nav-link" to="/admin/banner/create">
                    Add Banner
                  </NavLink>
                  <NavLink className="nav-link" to="/admin/banner/">
                    List Banner
                  </NavLink>
                </nav>
              </div>
              <NavLink className="nav-link" to="/admin/brand">
                <div className="sb-nav-link-icon">
                  <FaTags />
                </div>
                Brand Management
              </NavLink>
              <NavLink className="nav-link" to="/admin/category">
                <div className="sb-nav-link-icon">
                  <FaSquarespace />
                </div>
                Category Management
              </NavLink>
              <NavLink className="nav-link" to="/admin/user">
                <div className="sb-nav-link-icon">
                  <FaUsers />
                </div>
                User Management
              </NavLink>
              <NavLink className="nav-link" to="/admin/product">
                <div className="sb-nav-link-icon">
                  <FaProductHunt />
                </div>
                Product Management
              </NavLink>
              <NavLink className="nav-link" to="/admin/order">
                <div className="sb-nav-link-icon">
                  <FaShoppingBag />
                </div>
                Order Management
              </NavLink>
            </div>
          </div>
          <div className="sb-sidenav-footer">
            <div className="small">Logged in as:</div>
            {loggedinUser && loggedinUser.name}
          </div>
        </nav>
      </div>
    </>
  );
};

export const AdminFooter = () => {
  return (
    <>
      <footer className="py-4 bg-light mt-auto">
        <div className="container-fluid px-4">
          <div className="d-flex align-items-center justify-content-between small">
            <div className="text-muted">Copyright &copy; Ordinary 2023</div>
            <div>
              <a href="#">Privacy Policy</a>
              &middot;
              <a href="#">Terms &amp; Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
