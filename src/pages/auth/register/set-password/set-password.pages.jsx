import React from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function SetPassword() {
  return (
    <>
      <Container
        fluid
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <Form>
          <h3>Set your password</h3>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
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
