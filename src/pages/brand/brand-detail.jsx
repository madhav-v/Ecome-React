import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import brand from "../admin/brand";
import { toast } from "react-toastify";
import SingleProductListGrid from "../home/component/single-product-list-grid.component";

const BrandDetail = () => {
  let params = useParams();
  const [brandDetail, setBrandDetail] = useState();
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);

  const loadBrandDetail = useCallback(async () => {
    try {
      let response = await brand.brandSvc.getBrandDetail(params.slug);
      setBrandDetail(response.data.brandDetail);
      setProducts(response.data.productList);
    } catch (exception) {
      toast.warn("Error during Brand Fetch");
      console.log("Error:", exception);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    loadBrandDetail();
  }, [params]);

  return (
    <>
      <Container className="my-3">
        {loading ? (
          <>Loading..</>
        ) : brandDetail ? ( // Check if brandDetail is available
          <>
            <Row className="bg-light">
              <Col>
                <h4>Products of {brandDetail.name}</h4>
              </Col>
            </Row>
            <Row>
              {products ? (
                <>
                  {products.map((product, index) => (
                    <SingleProductListGrid key={index} product={product} />
                  ))}
                </>
              ) : (
                <Col sm={12}>
                  <p className="text-danger">No products available</p>
                </Col>
              )}
            </Row>
          </>
        ) : (
          <p className="text-danger">Brand details not available</p>
        )}
      </Container>
    </>
  );
};

export default BrandDetail;
