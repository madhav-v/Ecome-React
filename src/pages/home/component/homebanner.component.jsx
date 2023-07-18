import React from "react";
import { Carousel } from "react-bootstrap";

import banner1 from "../../../assets/images/banner-1.jpg";
import banner2 from "../../../assets/images/banner-2.jpg";
import banner3 from "../../../assets/images/banner-3.jpg";

const HomeBanner = () => {
  return (
    <>
      <div style={{ marginTop: "0px" }}>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              style={{ height: "500px" }}
              src={banner2}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              style={{ height: "500px" }}
              src={banner1}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              style={{ height: "500px" }}
              src={banner3}
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
};

export default HomeBanner;
