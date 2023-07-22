import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Auth } from "./";

const ActivateUser = () => {
  let params = useParams();
  let navigate = useNavigate();
  const loadUser = async () => {
    try {
      let user = await Auth.authSvc.getUserByToken(params.tokem);
      toast.success(
        "Your account has been activated successfullu. Please login to continue.."
      );
      navigate("/login");
    } catch (exception) {
      let message =
        exception.data.msg ??
        "Cannot activate your account at this moment. Please contact Admin";
      toast.warning(message);
      navigate("/register");
    }
  };
  useEffect(() => {
    loadUser();
  }, []);
  return <></>;
};

export default ActivateUser;
