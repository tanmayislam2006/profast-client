import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image1 from "../../assets/banner/banner1.png";
import Image2 from "../../assets/banner/banner2.png";
import Image3 from "../../assets/banner/banner1.png";

const Slider = () => {
  return (
    <div className="w-full max-w-7xl mx-auto mt-8">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div
            className="relative h-80 md:h-[420px] lg:h-[500px] flex items-center justify-center rounded-2xl overflow-hidden shadow-lg"
            style={{
              backgroundImage: `url(${Image1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="relative h-80 md:h-[420px] lg:h-[500px] flex items-center justify-center rounded-2xl overflow-hidden shadow-lg"
            style={{
              backgroundImage: `url(${Image2})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="relative h-80 md:h-[420px] lg:h-[500px] flex items-center justify-center rounded-2xl overflow-hidden shadow-lg"
            style={{
              backgroundImage: `url(${Image3})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
