import React from "react";
import {
  Container,
  Breadcrumb,
  Card,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";
import { FaArrowLeft, FaPaperPlane, FaRedo } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const BannerCreateForm = () => {
  const validationSchema = Yup.object({
    title: Yup.string().required(),
    link: Yup.string().url().nullable(),
    startDate: Yup.date().required(),
    endDate: Yup.date().min(Yup.ref("startDate")).required(),
    status: Yup.string()
      .matches(/active|inactive/)
      .required(),
    image: Yup.string().required(),
  });
  let formik = useFormik({
    initialValues: {
      title: "",
      link: "",
      startDate: "",
      endDate: "",
      status: "",
      image: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(
        "🚀 ~ file: banner-create.page.jsx:38 ~ BannerCreateForm ~ values:",
        values
      );
    },
  });
  return (
    <>
      <Container fluid className="px-4">
        <Row>
          <Col sm={12} md={6}>
            <h1 className="mt-4">Banner Create Page</h1>
          </Col>
          <Col md={6} sm={12} className="d-none d-md-block">
            <NavLink
              className={"btn btn-sm btn-success mt-5 float-end"}
              to="/admin/banner"
            >
              <FaArrowLeft /> Go to List
            </NavLink>
          </Col>
        </Row>

        <Breadcrumb className="mb-4">
          <Breadcrumb.Item>
            <NavLink to="/admin">Dashboard</NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <NavLink to="/admin/banner">Banner Listing</NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Home</Breadcrumb.Item>
        </Breadcrumb>

        <Card className="mb-4">
          <Card.Body>
            <Row>
              <Form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
                <Form.Group className="row mb-3">
                  <Form.Label className="col-sm-3">Title:</Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      name="title"
                      placeholder="Enter Banner Title"
                      size="sm"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                    />
                    <span className="text-danger">{formik.errors?.title}</span>
                  </Col>
                </Form.Group>
                <Form.Group className="row mb-3">
                  <Form.Label className="col-sm-3">Link:</Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      name="link"
                      placeholder="Enter Banner link"
                      size="sm"
                      value={formik.values.link}
                      onChange={formik.handleChange}
                    />
                    <span className="text-danger">{formik.errors?.link}</span>
                  </Col>
                </Form.Group>
                <Form.Group className="row mb-3">
                  <Form.Label className="col-sm-3">
                    Date(Start Date-End Date):
                  </Form.Label>
                  <Col sm={9}>
                    <Row>
                      <Col sm={6}>
                        <Form.Control
                          type="date"
                          name="startDate"
                          value={formik.values.startDate}
                          onChange={formik.handleChange}
                          size="sm"
                        />
                        <span className="text-danger">
                          {formik.errors?.startDate}
                        </span>
                      </Col>
                      <Col sm={6}>
                        <Form.Control
                          type="date"
                          value={formik.values.endDate}
                          onChange={formik.handleChange}
                          name="endDate"
                          size="sm"
                        />
                        <span className="text-danger">
                          {formik.errors?.endDate}
                        </span>
                      </Col>
                    </Row>
                  </Col>
                </Form.Group>
                <Form.Group className="row mb-3">
                  <Form.Label className="col-sm-3">Status:</Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      name="status"
                      value={formik.values.status}
                      onChange={formik.handleChange}
                      required
                      size="sm"
                    >
                      <option>--Select Any one--</option>
                      <option value={"active"}>Active</option>
                      <option value={"inactive"}>Inactive</option>
                    </Form.Select>
                    <span className="text-danger">{formik.errors?.status}</span>
                  </Col>
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
                </Form.Group>
              </Form>
              <Form.Group className="row mb-3">
                <Col onSubmit={{ offset: 3, span: 9 }}>
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
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default BannerCreateForm;
