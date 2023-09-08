import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Auth } from "../pages/auth/register";

const CheckPermission = ({ Component, accessBy }) => {
  let [userInfo, setUserInfo] = useState();
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(false);

  const getLoggedInUser = async () => {
    try {
      let user = await Auth.authSvc.getLoggedInUser();
      setUserInfo(user.result);
    } catch (error) {
      toast.error("Please Login First");
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getLoggedInUser();
  }, []);

  if (error) {
    return <Navigate to={"/login"} />;
  } else {
    if (loading) {
      return <>Loading</>;
    } else if (!loading && userInfo && userInfo.role === accessBy) {
      return Component;
    } else {
      toast.warning("You do not have permission to access this page");
      return <Navigate to={"/" + userInfo.role} />;
    }
  }

  // let userDetail = {
  //   role: "admin",
  // };
  // if (userDetail.role === accessBy) {
  //   return Component;
  // } else {
  //   toast.warning(
  //     "You do not have privilege to access " + accessBy + " pannel"
  //   );

  //   return <Navigate to={"/" + userDetail.role} />;
  // }
};

export default CheckPermission;
