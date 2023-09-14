import React from "react";
import { useCallback, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import cartService from "../product/cart.service";
import { resetCart, setCart } from "../../reducers/product.reducer";
import { FaMinus, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CartDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let cart = useSelector((root) => {
    return root.cart.cart;
  });
  const loggedInUser = useSelector((root) => {
    return root.User.loggedInUser;
  });

  const [cartDetail, setCartDetail] = useState();

  const loadDetail = useCallback(async () => {
    try {
      let detail = await cartService.getCartDetail(cart);
      if (detail.status) {
        setCartDetail(detail.result);
      }
    } catch (exception) {
      throw exception;
    }
  }, [cart]);

  useEffect(() => {
    if (cart) {
      loadDetail();
    }
  }, [cart]);

  const placeOrder = useCallback(async () => {
    try {
      let response = await cartService.placeAnOrder(cart);
      if (response.status) {
        toast.success("Your order has been placed successfully.");
        toast.success("We will contact you soon");
        dispatch(resetCart());

        navigate("/");
      }
    } catch (exception) {
      console.log(exception);
      toast.warning("Sorry! Your order could not be placed.");
    }
  }, []);

  return (
    <>
      <Container className="my-3 bg-light">
        <Row className="p-3">
          <Col sm={12}>
            <table className="table table-sm table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Product Name</th>
                  <th>Product Image</th>
                  <th>Product Price</th>
                  <th>Product Qty</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {cartDetail &&
                  cartDetail.map((cartItem, key) => (
                    <tr key={key}>
                      <th>{cartItem.productName}</th>
                      <th>
                        <img
                          className="img img-fluid"
                          src={
                            import.meta.env.VITE_IMAGE_URL +
                            "/products/" +
                            cartItem.productImage
                          }
                          style={{ maxWidth: "50px" }}
                        />
                      </th>
                      <th>Npr. {cartItem.price}</th>
                      <th>
                        <Button
                          size="sm"
                          className="me-2"
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(
                              setCart({
                                productId: cartItem.productId,
                                qty: cartItem.qty - 1,
                              })
                            );
                          }}
                        >
                          <FaMinus />
                        </Button>
                        {cartItem.qty}
                        <Button
                          size="sm"
                          className="me-2"
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(
                              setCart({
                                productId: cartItem.productId,
                                qty: cartItem.qty + 1,
                              })
                            );
                          }}
                        >
                          <FaPlus />
                        </Button>
                      </th>
                      <th>Npr. {cartItem.amount}</th>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Col>
        </Row>
        <Row>
          <Col className="">
            <Button
              onClick={placeOrder}
              variant="warning"
              className="text-white float-end"
              size="sm"
            >
              Place an Order
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CartDetail;
