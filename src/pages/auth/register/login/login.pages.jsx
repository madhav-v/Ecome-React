import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FaFacebook, FaGoogle, FaPaperPlane } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axiosInstance from "../../../../config/axios.config";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedInuser } from "../../../../reducers/user.reducer";

function Login() {
  const dispatch = useDispatch();

  const LoginSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required(),
  });

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: null,
      password: null,
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        let response = await axiosInstance.post("/v1/auth/login", values);
        if (response.status) {
          let formattedData = {
            id: response.result.data._id,
            name: response.result.data.name,
            email: response.result.data.email,
            role: response.result.data.role,
          };

          dispatch(setLoggedInuser(formattedData));

          localStorage.setItem(
            "accessToken",
            response.result.token.accessToken
          );
          localStorage.setItem(
            "refreshToken",
            response.result.token.refreshToken
          );
          localStorage.setItem("user", JSON.stringify(formattedData));
          toast.success("Welcome to " + formattedData.role + " page");
          navigate("/" + formattedData.role);
        } else {
          toast.error(response.msg);
        }
      } catch (axiosErrorResponse) {
        toast.error(axiosErrorResponse.data.msg);
        console.log(
          "🚀 ~ file: login.pages.jsx:29 ~ onSubmit: ~ axiosErrorResponse:",
          axiosErrorResponse
        );
      }

      // toast.success("Welcome to " + role.role + " Panel!");
      // navigate("/" + role.role);

      // console.log("🚀 ~ file: login.pages.jsx:17 ~ Login ~ values:", values);
    },
  });

  let loggedInUser = useSelector((root) => {
    return root.User?.loggedInUser;
  });
  useEffect(() => {
    if (loggedInUser) {
      let redirect = localStorage.getItem("redirect")
        ? localStorage.getItem("redirect")
        : "/";

      toast.info("You are logged in");

      navigate(redirect);
    }
  }, [loggedInUser]);

  return (
    <Container style={{ width: "500px", marginTop: "50px" }}>
      <Button
        variant="light"
        style={{
          width: "500px",
          height: "50px",
          marginBottom: "10px",
          borderRadius: "10px",
        }}
      >
        <FaGoogle
          color="green"
          style={{
            marginRight: "10px",
          }}
        />
        Sign in with Google
      </Button>
      <Button
        variant="light"
        style={{
          width: "500px",
          height: "50px",
          marginBottom: "10px",
          borderRadius: "10px",
        }}
      >
        <FaFacebook
          color="blue"
          style={{
            marginRight: "10px",
          }}
        />
        Sign in with Google
      </Button>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={formik.handleChange}
          />
          <span className="text-danger">{formik.errors?.email}</span>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={formik.handleChange}
          />
          <span className="text-danger">{formik.errors?.password}</span>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember Me" defaultChecked />
          <Link to="/forget-password">Forget Password</Link>
        </Form.Group>
        <Button variant="dark" type="submit" style={{ width: "200px" }}>
          <FaPaperPlane />
          Login
        </Button>
        <Container fluid style={{ marginTop: "10px" }}>
          <p>
            Are you not registered? <Link to="/register">Register Here</Link>
          </p>
        </Container>
      </Form>
    </Container>
  );
}

export default Login;
