import React, { useState } from "react";
import { Col, Container, Row, Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Auth } from "..";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  let [loading, setLoading] = useState(false);

  const LoginSchema = Yup.object({
    email: Yup.string().email().required(),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      setLoading(true);

      try {
        const response = await Auth.authSvc.forgetPassword(values.email);

        localStorage.setItem("email", values.email);

        if (response.status === true) {
          toast.success(response.msg);
        } else {
          toast.error(response.msg || "Something went wrong.");
        }
      } catch (error) {
        toast.error("Error occurred. Please try again later.");
      }

      setLoading(false);
    },
  });

  return (
    <>
      <Container
        fluid
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          marginTop: "20px",
        }}
      >
        <Row>
          <Container fluid>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Reset Your Password</Card.Title>
                <h4>Enter your email</h4>
                <p>
                  Enter your email and we will send you a confirmation link on
                  email
                </p>
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    <span className="text-danger">{formik.errors?.email}</span>
                  </Form.Group>
                  <Button
                    disabled={loading}
                    variant="dark"
                    type="submit"
                    style={{ width: "200px" }}
                  >
                    Submit
                  </Button>
                </Form>
              </Card.Body>
              <p>
                Go back to <Link to="/login">Login Page</Link>
              </p>
            </Card>
          </Container>
        </Row>
      </Container>
    </>
  );
};

export default ForgetPassword;
