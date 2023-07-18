import React from "react";
import { useParams } from "react-router-dom";
import Header from "../home/component/header.component";

const CategoryDetail = () => {
  let params = useParams();

  return (
    <>
      <Header />
      Category Detail Page of {params.slug}
    </>
  );
};

export default CategoryDetail;
