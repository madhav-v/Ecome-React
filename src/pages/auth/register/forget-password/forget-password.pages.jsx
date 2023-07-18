import React from "react";
import { Col, Container, Row, Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const ForgetPassword = () => {
  const LoginSchema = Yup.object({
    email: Yup.string().email().required(),
  });

  const formik = useFormik({
    initialValues: {
      email: null,
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      console.log("🚀 ~ file: login.pages.jsx:17 ~ Login ~ values:", values);
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
                    />
                    <span className="text-danger">{formik.errors?.email}</span>
                  </Form.Group>
                  <Button
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
