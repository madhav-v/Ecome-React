import React, { useCallback } from "react";
import { Form, Col, Button, Row } from "react-bootstrap";
import { TextInput } from "../../../components/form-component";
import { FaMinus, FaPaperPlane, FaPlus, FaRedo } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import Select from "react-select";
import brand from "../brand";
import category from ".";

const CategoryForm = ({ submitAction, detail = null }) => {
  const [attributes, setAttributes] = useState();

  const [brands, setBrands] = useState();

  const [cats, setCats] = useState();

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    parent: Yup.string(),
    status: Yup.string()
      .matches(/active|inactive/)
      .required(),
    brands: Yup.array(),
    attributes: Yup.array(),
    image: Yup.string().required(),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      parent: "",
      status: "",
      brands: [],
      attributes: [{ key: null, value: [] }],
      image: {},
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // values.parent = values.parent === "" ? null : values.parent;
      values.brands = values.brands.map((item) => item.value);
      values.attributes = attributes;
      submitAction(values);
    },
  });

  const addAttribute = () => {
    let attr = {
      key: null,
      value: null,
    };
    let allAttr = [];
    if (attributes) {
      allAttr = [...attributes];
    }
    allAttr.push(attr);

    setAttributes(allAttr);
  };

  const removeAttribute = (index) => {
    let allAttrs = [...attributes];
    allAttrs.splice(index, 1);
    setAttributes(allAttrs);
  };

  const getAllBrands = useCallback(async () => {
    try {
      let brandList = await brand.brandSvc.listAllBrands();
      let opts = brandList.result.map((brand) => {
        return { value: brand._id, label: brand.name };
      });
      setBrands(opts);
    } catch (exception) {}
  }, []);

  const getAllCats = useCallback(async () => {
    try {
      let listCats = await category.categorySvc.listAllCategories();
      setCats(listCats.result);
    } catch (exception) {
      console.log(exception);
    }
  }, []);

  useEffect(() => {
    getAllBrands();
    getAllCats();
  }, []);

  useEffect(() => {
    if (detail) {

      let data = {
        name: detail.name,
        parent: detail.parent?.id,
        status: detail.status,
        image: detail.image,
        brands:
          detail.brands && detail.brands.length
            ? detail.brands.map((item) => ({
                value: item._id,
                label: item.name,
              }))
            : null,
        attributes: detail.attributes,
      };
      formik.setValues({
        ...formik.values,
        ...data,
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
          <Form.Label className="col-sm-3">Sub-category Of: </Form.Label>
          <Col sm={9}>
            <Form.Select
              name="parent"
              value={formik.values?.parent}
              required
              onChange={formik.handleChange}
              size="sm"
            >
              <option>-- Select Any one --</option>
              {cats &&
                cats.map((cat) => (
                  <option
                    selected={
                      formik.values.parent && formik.values.parent === cat._id
                        ? true
                        : false
                    }
                    value={cat._id}
                  >
                    {cat.name}
                  </option>
                ))}
            </Form.Select>
            <span className="text-danger">{formik.errors?.parent}</span>
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Brands: </Form.Label>
          <Col sm={9}>
            <Select
              options={brands}
              value={formik.values?.brands}
              isMulti
              name="brands"
              onChange={(selectOpts) => {
                formik.setValues({
                  ...formik.values,
                  brands: selectOpts,
                });
              }}
            />

            <span className="text-danger">{formik.errors?.brands}</span>
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Atrributes: </Form.Label>
          <Col sm={9}>
            {attributes &&
              attributes.map((item, key) => (
                <Row className="mb-3" key={key}>
                  <Col sm={5}>
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="Attribute Key"
                      value={item.key}
                      onChange={(e) => {
                        let allAttrs = [...attributes];
                        allAttrs[key].key = e.target.value;
                        setAttributes(allAttrs);
                      }}
                    />
                  </Col>
                  <Col sm={5}>
                    <Form.Control
                      onChange={(e) => {
                        let allAttrs = [...attributes];
                        allAttrs[key].value = [e.target.value];
                        setAttributes(allAttrs);
                      }}
                      value={item.value}
                      type="text"
                      size="sm"
                      placeholder="Attribute value"
                    />
                  </Col>
                  <Col sm={2}>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={(e) => {
                        removeAttribute(key);
                      }}
                    >
                      <FaMinus />
                    </Button>
                  </Col>
                </Row>
              ))}

            <Row>
              <Col sm={12}>
                <Button
                  variant="success"
                  type="button"
                  size="sm"
                  onClick={addAttribute}
                >
                  <FaPlus /> Add More
                </Button>
              </Col>
            </Row>
          </Col>
        </Form.Group>

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

export default CategoryForm;
