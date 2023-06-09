import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./style.scss";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import { Box } from "@mui/material";

SlideShow.propTypes = {};

function SlideShow(props) {
  return (
    <Box className="slide">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className="swiper-slide">
          <img src="https://www.pcquest.com/wp-content/uploads/2023/01/Best-Smartphones-for-Gaming-Under-Rs.20000-1.jpg" />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img src="https://i0.wp.com/noticiasaldiayalahora.co/wp-content/uploads/2021/09/Apple-iphone-13.jpg?fit=850%2C400&ssl=1" />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img src="https://cdn.shopify.com/s/files/1/0170/7399/5876/collections/uploadyour.png?v=1583344030" />
        </SwiperSlide>
      </Swiper>
      <Box className="slide-right">
        <img src="https://viennam.com/UserUpload/Editor/c1bc4722-e3c2-4f54-8604-ff0891b95953.gif" />
        <img src="https://png.pngtree.com/png-vector/20191127/ourmid/pngtree-banner-sale-up-to-design-png-image_2042203.jpg" />
      </Box>
    </Box>
  );
}

export default SlideShow;
