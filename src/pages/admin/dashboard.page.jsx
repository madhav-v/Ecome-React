import React from "react";
import { Container, Breadcrumb, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <>
      <Container fluid className="px-4">
        <h1 className="mt-4">Dashboard</h1>
        <Breadcrumb className="mb-4">
          <li className="breadcrumb-item">
            <Link role="button" className={"breadcrumb-item"} to="/admin">
              Dashboard
            </Link>
          </li>

          <Breadcrumb.Item active>Home</Breadcrumb.Item>
        </Breadcrumb>

        <Card className="mb-4">
          <Card.Body>
            <p className="mb-0">Dashboard page</p>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default AdminDashboard;
