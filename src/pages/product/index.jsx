import React, { useCallback, useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import product from "../admin/product";
import {
  Container,
  Row,
  Col,
  Carousel,
  Badge,
  Form,
  Button,
} from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setCart, setCartAPI } from "../../reducers/product.reducer";

const ProductDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  let [loading, setLoading] = useState(true);
  let [detail, setDetail] = useState();
  let [qty, setQty] = useState(0);

  const loadProductDetail = useCallback(async () => {
    try {
      let response = await product.productSvc.getProductBySlug(params.slug);
      setDetail(response.result);
    } catch (exception) {
      toast.warn("Product Detail cannot be fetched");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProductDetail();
  }, [params]);

  let loggedInuser = useSelector((root) => {
    return root.User.loggedInUser;
  });

  const dispatch = useDispatch();

  const addToCart = (e) => {
    e.preventDefault();
    if (!loggedInuser) {
      localStorage.setItem("redirect", "/product/" + detail.slug);
      toast.warn("Please Login First");
      navigate("/login");
    }
    let currentItem = {
      productId: detail._id,
      qty: Number(qty),
    };
    dispatch(setCart(currentItem));
    dispatch(setCartAPI)

    toast.success("Your Product has been added to the cart");
  };

  return (
    <>
      <Container className="my-5 bg-light">
        {loading ? (
          <>Loading...</>
        ) : (
          <>
            <Row>
              <Col sm={12} md={2}>
                <Carousel>
                  {detail &&
                    detail.images.map((item, index) => (
                      <Carousel.Item key={index}>
                        <img
                          style={{ height: "200px", width: "200px" }}
                          src={
                            import.meta.env.VITE_IMAGE_URL + "/products/" + item
                          }
                          className="img img-fluid"
                        />
                      </Carousel.Item>
                    ))}
                </Carousel>
              </Col>
              <Col sm={12} md={10}>
                <h4>{detail.name}</h4>
                <p>
                {detail.brand && (
                <NavLink to={`/brand/${detail.brand.slug}`} className={"me-3"}>
                  <Badge bg="info">{detail.brand.name}</Badge>
                </NavLink>
              )}

                  {detail.categories &&
                    detail.categories.map((cat) => (
                      <NavLink
                        key={cat._id}
                        to={`/category/${cat.slug}`}
                        className={"me-3"}
                      >
                        <Badge bg="warning">{cat.name}</Badge>
                      </NavLink>
                    ))}
                </p>
                <p>
                  <span>NPR. {detail.afterDiscount}</span>
                  {detail.discount && (
                    <del className="mx-3 text-danger">Npr. {detail.price}</del>
                  )}
                </p>
                <Row>
                  <Col sm={6}>
                    <Form.Control
                      type="number"
                      name="quantity"
                      required
                      onChange={(e) => {
                        setQty(e.target.value);
                      }}
                      size="sm"
                      placeholder="Enter Quantity"
                    ></Form.Control>
                  </Col>
                  <Col sm={6}>
                    <Button
                      variant="warning"
                      size="sm"
                      className="text-white"
                      onClick={addToCart}
                    >
                      <FaPlus /> &nbsp; Add to Cart
                    </Button>
                  </Col>
                  <Col
                    sm={12}
                    className="m-3"
                    dangerouslySetInnerHTML={{ __html: detail.detail }}
                  ></Col>
                </Row>
              </Col>
            </Row>
            <Row></Row>
          </>
        )}
      </Container>
    </>
  );
};

export default ProductDetail;
