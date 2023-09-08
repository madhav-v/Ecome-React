import React from "react";
import { Form, Col, Button } from "react-bootstrap";
import { TextInput } from "../../../components/form-component";
import { FaPaperPlane, FaRedo } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

const BrandForm = ({ submitAction, detail = null }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required(),
    status: Yup.string()
      .matches(/active|inactive/)
      .required(),
    image: Yup.string().required(),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      status: "",
      image: {},
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      submitAction(values);
    },
  });

  useEffect(() => {
    if (detail) {
      formik.setValues({
        name: detail.name,
        status: detail.status,
        image: detail.image,
      });
    }
  }, [detail]);
  return (
    <>
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
                  ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"].includes(
                    ext.toLowerCase()
                  )
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
            <Button variant="success" className="me-3" type="submit" size="sm">
              <FaPaperPlane /> Submit
            </Button>
            <Button variant="danger" type="reset" size="sm">
              <FaRedo /> Cancel
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};

export default BrandForm;
