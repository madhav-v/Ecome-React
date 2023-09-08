import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import noUser from "../../../assets/images/no-user.png";
import AuthService from "./auth.service";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

// import { Auth } from "./";

function Register() {
  const navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  const RegisterSchema = Yup.object({
    name: Yup.string()
      .min(5, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email().required(),
    role: Yup.string()
      .matches(/seller|customer/)
      .default("customer"),
    password: Yup.string().min(8).max(15).required(),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Password and confirm password should match"
    ),
    image: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      name: null,
      email: null,
      password: null,
      confirmPassword: null,
      image: null,
      role: "customer",
      termsAndConditions: false,
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        let formData = new FormData();
        const authSvc = new AuthService();

        // file append
        formData.append("image", values.image, values.image.filename);

        // text data
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("role", values.role);
        formData.append("password", values.password);

        let response = await authSvc.register(formData);
        if (response.status) {
          toast.success(
            "Your account has been registered. Please Check your email for activation Process!"
          );
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
  });

  let loggedInUser = useSelector((root) => {
    return root.User?.loggedInUser;
  });
  useEffect(() => {
    if (loggedInUser) {
      toast.info("You are already logged in");
      navigate("/" + loggedInUser.role);
    }
  }, [loggedInUser]);

  return (
    <Container style={{ width: "500px", marginTop: "50px" }}>
      <Container>
        <h2 className="text-center">Create your account</h2>
      </Container>
      <hr />
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Full name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter your full name"
            name="name"
            onChange={formik.handleChange}
          />
          <span className="text-danger">{formik.errors?.name}</span>
        </Form.Group>
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
        <Form.Group className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Select
            name="role"
            required
            onChange={formik.handleChange}
            value={formik.values.role}
          >
            <option value={"seller"}>Seller</option>
            <option value={"customer"}>Customer</option>
          </Form.Select>
          <span className="text-danger">{formik.errors?.role}</span>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Profile Image</Form.Label>
          <Form.Control
            type="file"
            name="image"
            required
            accept="image/*"
            onChange={(e) => {
              let file = e.target.files[0];
              let ext = file.name.split(".").pop();

              if (
                ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"].includes(
                  ext.toLowerCase()
                )
              ) {
                // formik.setValues({
                //   ...formik.values,
                //   image: file,
                // });
                formik.setFieldValue("image", file);
              } else {
                formik.setErrors({
                  ...formik.errors,
                  image: "File format not supported",
                });
              }
            }}
          ></Form.Control>
          <span className="text-danger">{formik.errors?.image}</span>
          <img
            src={
              formik.values.image && typeof formik.values.image !== "string"
                ? URL.createObjectURL(formik.values.image)
                : noUser
            }
            alt=""
            className="img img-fluid"
            style={{ width: "100px", marginTop: "10px" }}
          />
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
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Repeat Password"
            name="confirmPassword"
            onChange={formik.handleChange}
          />
          <span className="text-danger">{formik.errors?.confirmPassword}</span>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="I agree to all terms and conditions"
            name="termsAndConditions"
            onChange={formik.handleChange}
            isInvalid={
              formik.touched.termsAndConditions &&
              formik.errors.termsAndConditions
            }
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors?.termsAndConditions}
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={loading}
          variant="dark"
          type="submit"
          style={{ width: "200px" }}
        >
          Register
        </Button>
        <Container fluid style={{ marginTop: "10px" }}>
          Already Registered? <Link to="/login"> Login</Link>
        </Container>
      </Form>
    </Container>
  );
}

export default Register;
