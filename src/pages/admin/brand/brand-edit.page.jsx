import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Breadcrumb,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaEdit, FaPaperPlane, FaRedo } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextInput } from "../../../components/form-component";
import brand from ".";
import { toast } from "react-toastify";
import { formatDate } from "../../../config/function";

const BrandEditForm = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [detail, setDetail] = useState();

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    status: Yup.string()
      .matches(/active|inactive/)
      .required(),
    image: Yup.string().required(),
  });
  let formik = useFormik({
    initialValues: {
      title: "",
      status: "",
      image: {},
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        if (typeof values.image !== "object") {
          delete values.image;
        }
        const response = await brand.brandSvc.updateBrand(values, params.id);
        toast.success(response.msg);
        navigate("/admin/brand");
      } catch (error) {
        // TODO: Debug for error
        toast.error(
          "Cannot update brand. Retry again after reloading the page..."
        );
      }
    },
  });

  const getBrandDetail = async () => {
    try {
      let response = await brand.brandSvc.getBrandById(params.id);
      setDetail(response.result);
    } catch (exception) {
      toast.error("Brand cannot be fetched");
      navigate("/admin/brand");
    }
  };

  useEffect(() => {
    if (detail) {
      formik.setValues({
        name: detail.name,
        status: detail.status,
        image: detail.image,
      });
    }
  }, [detail]);

  useEffect(() => {
    getBrandDetail();
  }, []);

  return (
    <>
      <Container fluid className="px-4">
        <Row>
          <Col sm={12} md={6}>
            <h1 className="mt-4">Brand Edit Page</h1>
          </Col>
          <Col md={6} sm={12} className="d-none d-md-block">
            <NavLink
              className={"btn btn-sm btn-success mt-5 float-end"}
              to="/admin/brand"
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
            <NavLink to="/admin/brand">Brand Listing</NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Brand Edit</Breadcrumb.Item>
        </Breadcrumb>

        <Card className="mb-4">
          <Card.Body>
            <Form onSubmit={formik.handleSubmit}>
              <TextInput
                label="Name"
                name="name"
                value={formik.values?.name}
                changeEvent={formik.handleChange}
                placeholder="Enter name..."
                error={formik.errors?.name}
              />

              <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Status: </Form.Label>
                <Col sm={9}>
                  <Form.Select
                    name="status"
                    value={formik.values?.status}
                    required
                    onChange={formik.handleChange}
                    size="sm"
                  >
                    <option>-- Select Any one --</option>
                    <option value={"active"}>Publish</option>
                    <option value={"inactive"}>Un-Publish</option>
                  </Form.Select>
                  <span className="text-danger">{formik.errors?.status}</span>
                </Col>
              </Form.Group>

              <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Image: </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="file"
                    size="sm"
                    name="image"
                    onChange={(e) => {
                      let file = e.target.files[0];
                      let ext = file.name.split(".").pop();

                      if (
                        [
                          "jpg",
                          "jpeg",
                          "png",
                          "gif",
                          "bmp",
                          "webp",
                          "svg",
                        ].includes(ext.toLowerCase())
                      ) {
                        formik.setValues({
                          ...formik.values,
                          image: file,
                        });
                      } else {
                        formik.setErrors({
                          ...formik.errors,
                          image: "File format not supported",
                        });
                      }
                    }}
                    accept="image/*"
                  />
                  <span className="text-danger">{formik.errors?.image}</span>
                </Col>
              </Form.Group>

              <Form.Group className="row mb-3">
                <Col sm={{ offset: 3, span: 9 }}>
                  <Button
                    variant="success"
                    className="me-3"
                    type="submit"
                    size="sm"
                  >
                    <FaPaperPlane /> Submit
                  </Button>
                  <Button variant="danger" type="reset" size="sm">
                    <FaRedo /> Cancel
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default BrandEditForm;
