import React, { useCallback, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner from "../../admin/banner";

import { toast } from "react-toastify";

const HomeBanner = () => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [bannerlist, setBannerList] = useState();

  const loadBanners = useCallback(async () => {
    try {
      let response = await banner.bannerSvc.listHomePageBannerData();
      if (response.result) {
        setBannerList(response.result);
      }
    } catch (exception) {
      console.log(exception);
      toast.warn("Error while fetching banner");
    }
  }, []);

  useEffect(() => {
    loadBanners();
  }, []);

  return (
    <>
      <div className="slider">
        <Slider {...settings}>
          {bannerlist &&
            bannerlist.map((banner, index) => (
              <div key={index}>
                <a href={banner.link} target="_blank">
                  <img
                    className="img img-fluid"
                    src={
                      import.meta.env.VITE_IMAGE_URL + "/banner/" + banner.image
                    }
                  />
                </a>
              </div>
            ))}
        </Slider>
      </div>
    </>
  );
};

export default HomeBanner;
