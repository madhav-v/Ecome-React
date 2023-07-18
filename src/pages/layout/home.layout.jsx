import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../home/component/header.component";

const HomePageLayout = () => {
  return (
    <>
      <Header />
      
      <Outlet />
    </>
  );
};

export default HomePageLayout;
