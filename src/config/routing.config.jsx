import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Homepage from "../pages/home";
import ErrorPage from "../pages/errors/404.page";
import CategoryDetail from "../pages/category/detail.page";
import HomePageLayout from "../pages/layout/home.layout";
import Blogs from "../pages/blogs/blogs";
import AboutUs from "../pages/home/about-us.page";
import Seller from "../pages/become-seller/seller";
import Cart from "../pages/carts/carts";
import Register from "../pages/auth/register/register.pages";
import Login from "../pages/auth/register/login/login.pages";
import ForgetPassword from "../pages/auth/register/forget-password/forget-password.pages";
import SetPassword from "../pages/auth/register/set-password/set-password.pages";
import AdminLayout from "../pages/layout/admin.layout";
import AdminDashboard from "../pages/admin/dashboard.page";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import CheckPermission from "./rbsc.config";
import ActivateUser from "../pages/auth/register/activate-user.page";
import Banner from "../pages/admin/banner/";
import Brand from "../pages/admin/brand/";
import Category from "../pages/admin/category/";
import Product from "../pages/admin/product/";
import { useDispatch } from "react-redux";
import { getLoggedInUser } from "../reducers/user.reducer";
import BrandDetail from "../pages/brand/brand-detail";
import ProductDetail from "../pages/product";
import { setItemInTheCart } from "../reducers/product.reducer";
import OrderList from "../pages/admin/cart/order.list.page";
// import SearchResultsPage from "../pages/home/component/search.results";

const Routing = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLoggedInUser());
    dispatch(setItemInTheCart());
  }, []);
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePageLayout />}>
            <Route index element={<Homepage />} />

            <Route path="about-us" element={<AboutUs />}></Route>

            <Route path="category/:slug" element={<CategoryDetail />}></Route>
            <Route path="brand/:slug" element={<BrandDetail />} />
            <Route path="product/:slug" element={<ProductDetail />} />

            <Route path="blogs" element={<Blogs />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="activate/:tokem" element={<ActivateUser />} />
            <Route path="forget-password" element={<ForgetPassword />}></Route>
            <Route path="set-password/:token" element={<SetPassword />}></Route>
            <Route path="cart" element={<Cart />}></Route>
            {/* <Route
              path="/search-results"
              element={<SearchResultsPage />}
            ></Route> */}

            <Route path="*" element={<ErrorPage />}></Route>
          </Route>

          <Route
            path="/admin"
            element={
              <CheckPermission accessBy={"admin"} Component={<AdminLayout />} />
            }
          >
            <Route index element={<AdminDashboard />} />

            <Route
              path="banner"
              element={
                <>
                  <Outlet />
                </>
              }
            >
              <Route index element={<Banner.BannerListPage />} />
              <Route path="create" element={<Banner.BannerCreateForm />} />
              <Route path=":id" element={<Banner.BannerEditForm />} />
            </Route>

            <Route
              path="brand"
              element={
                <>
                  <Outlet />
                </>
              }
            >
              <Route index element={<Brand.BrandListPage />} />
              <Route path="create" element={<Brand.BrandCreateForm />} />
              <Route path=":id" element={<Brand.BrandEditForm />} />
            </Route>

            <Route
              path="category"
              element={
                <>
                  <Outlet />
                </>
              }
            >
              <Route index element={<Category.CategoryListPage />} />
              <Route path="create" element={<Category.CategoryCreateForm />} />
              <Route path=":id" element={<Category.CategoryEditForm />} />
            </Route>

            <Route
              path="user"
              element={
                <>
                  <Outlet />
                </>
              }
            />
            <Route
              path="product"
              element={
                <>
                  <Outlet />
                </>
              }
            >
              <Route index element={<Product.ProductListPage />} />
              <Route path="create" element={<Product.ProductCreateForm />} />
              <Route path=":id" element={<Product.ProductEditForm />} />
            </Route>
            <Route
              path="order"
              element={
                <>
                  <OrderList />
                </>
              }
            />
            <Route
              path="transaction"
              element={
                <>
                  <Outlet />
                </>
              }
            />
            <Route
              path="review"
              element={
                <>
                  <Outlet />
                </>
              }
            />
          </Route>
          <Route
            path="/seller"
            element={
              <CheckPermission accessBy={"seller"} Component={<Seller />} />
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
