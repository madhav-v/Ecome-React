import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Auth } from "..";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SetPasswordSchema = Yup.object({
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("New Password is required"),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm New Password is required"),
});

function SetPassword() {
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: localStorage.getItem("email"),
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: SetPasswordSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await Auth.authSvc.resetPassword(
          values.email,
          values.newPassword
        );

        toast.success(
          "Password has been reset successfully. Please Login to continue"
        );

        navigate("/login");

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    },
  });

  return (
    <>
      <Container
        fluid
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <Form onSubmit={formik.handleSubmit}>
          <h3>Set your password</h3>
          <Form.Group className="mb-3" controlId="newPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
            />
            <span className="text-danger">{formik.errors?.newPassword}</span>
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirmNewPassword">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="confirmNewPassword"
              value={formik.values.confirmNewPassword}
              onChange={formik.handleChange}
            />
            <span className="text-danger">
              {formik.errors?.confirmNewPassword}
            </span>
          </Form.Group>
          <Button variant="dark" type="submit">
            Set new password
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default SetPassword;
