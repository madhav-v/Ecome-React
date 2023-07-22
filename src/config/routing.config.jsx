import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "../pages/home";
import ErrorPage from "../pages/errors/404.page";
import CategoryDetail from "../pages/category/detail.page";
import HomePageLayout from "../pages/layout/home.layout";
import Blogs from "../pages/blogs/blogs";

import Seller from "../pages/become-seller/seller";
import Cart from "../pages/carts/carts";
import Register from "../pages/auth/register/register.pages";
import Login from "../pages/auth/register/login/login.pages";
import ForgetPassword from "../pages/auth/register/forget-password/forget-password.pages";
import SetPassword from "../pages/auth/register/set-password/set-password.pages";
import AdminLayout from "../pages/layout/admin.layout";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import CheckPermission from "./rbsc.config";
import ActivateUser from "../pages/auth/register/activate-user.page";

const Routing = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePageLayout />}>
            <Route index element={<Homepage />} />

            <Route path="category/:slug" element={<CategoryDetail />}></Route>

            <Route path="blogs" element={<Blogs />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="/activate/:tokem" element={<ActivateUser />} />
            <Route path="forget-password" element={<ForgetPassword />}></Route>
            <Route path="set-password/:token" element={<SetPassword />}></Route>
            <Route path="cart" element={<Cart />}></Route>

            <Route path="*" element={<ErrorPage />}></Route>
          </Route>

          <Route
            path="/seller"
            element={
              <CheckPermission accessBy={"seller"} Component={<Seller />} />
            }
          ></Route>
          <Route
            path="/admin"
            element={
              <CheckPermission
                accessBy={"admin"}
                Component={<AdminLayout />}
              ></CheckPermission>
            }
          ></Route>
          <Route
            path="/customer"
            element={
              <CheckPermission
                accessBy={"customer"}
                Component={<>Customer Layout</>}
              ></CheckPermission>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default Routing;
