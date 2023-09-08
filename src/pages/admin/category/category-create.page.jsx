import React from "react";
import { Container, Card, Breadcrumb, Row, Col } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import category from ".";
import { toast } from "react-toastify";
import CategoryForm from "./category-form.component";

const CategoryCreateForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      // submit
      const response = await category.categorySvc.createCategory(values);
      toast.success(response.msg);
      navigate("/admin/category");
    } catch (error) {
      // TODO: Debug for error
      toast.error(
        "Cannot create category. Retry again after reloading the page..."
      );
    }
  };
  return (
    <>
      <Container fluid className="px-4">
        <Row>
          <Col sm={12} md={6}>
            <h1 className="mt-4">Category Create Page</h1>
          </Col>
          <Col md={6} sm={12} className="d-none d-md-block">
            <NavLink
              className={"btn btn-sm btn-success mt-5 float-end"}
              to="/admin/category"
            >
              <FaArrowLeft /> Go To List
            </NavLink>
          </Col>
        </Row>
        <Breadcrumb className="mb-4">
          <Breadcrumb.Item>
            <NavLink to="/admin">Dashboard</NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <NavLink to="/admin/category">Category Listing</NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Category Create</Breadcrumb.Item>
        </Breadcrumb>

        <Card className="mb-4">
          <Card.Body>
            <CategoryForm submitAction={handleSubmit} />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default CategoryCreateForm;
