import React from "react";
import { Container, Card, Breadcrumb, Row, Col } from "react-bootstrap";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import category from ".";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import CategoryForm from "./category-form.component";

const CategoryEditForm = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [detail, setDetail] = useState();

  const handleSubmit = async (values) => {
    try {
      if (typeof values.image !== "object") {
        delete values.image;
      }

      const response = await category.categorySvc.updateCategory(
        values,
        params.id
      );
      toast.success(response.msg);
      navigate("/admin/category");
    } catch (error) {
      // TODO: Debug for error
      console.log(error);
      toast.error(
        "Cannot create category. Retry again after reloading the page..."
      );
    }
  };

  const getCategoryDetail = async () => {
    try {
      let response = await category.categorySvc.getCategoryById(params.id);
      setDetail(response.result);
    } catch (exception) {
      toast.error("Category Cannot be fetched at this moment");
      navigate("/admin/category");
    }
  };
  useEffect(() => {
    // get Detail
    getCategoryDetail();
  }, []);

  return (
    <>
      <Container fluid className="px-4">
        <Row>
          <Col sm={12} md={6}>
            <h1 className="mt-4">Category Edit Page</h1>
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
          <Breadcrumb.Item active>Category Edit</Breadcrumb.Item>
        </Breadcrumb>

        <Card className="mb-4">
          <Card.Body>
            {detail && (
              <CategoryForm submitAction={handleSubmit} detail={detail} />
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default CategoryEditForm;
