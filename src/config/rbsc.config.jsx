import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const CheckPermission = ({ Component, accessBy }) => {
  let userDetail = {
    role: "admin",
  };
  if (userDetail.role === accessBy) {
    return Component;
  } else {
    toast.warning(
      "You do not have privilege to access " + accessBy + " pannel"
    );

    return <Navigate to={"/" + userDetail.role} />;
  }
};

export default CheckPermission;
