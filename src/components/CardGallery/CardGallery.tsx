import React from "react";
// Import Swiper React components
/* eslint-disable import/no-unresolved */
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./CardGallery.scss";
import { v4 } from "uuid";
import { IPersonAllData } from "../../utils/interfaces";
import useImage from "../../utils/useImage";

export default function CardGallery({ person }: { person: IPersonAllData }) {
  const folderRoute = person.main_image.slice(
    0,
    person.main_image.indexOf("/")
  );

  // const list = require.context(`../../img/${folderRoute}`, false, /\.(png|jpg)$/).keys();
  const list = require.context(`../../img`, true, /\.(png|jpg)$/).keys();

  const imagesArr = list.filter((img) => {
    return img.indexOf(folderRoute) !== -1;
  });

  console.log(imagesArr);

  const listItems = imagesArr.map((img) => {
    const slicedRoute = img.slice(2);

    const { image } = useImage(`${slicedRoute}`);
    // return <img className="gallery__item" src={image} alt="" key={v4()} />;
    return (
      <SwiperSlide>
        <img className="gallery__item" src={image} alt="" key={v4()} />
      </SwiperSlide>
    );
  });

  // return <div className="keen-slider"> {listItems} </div>;
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop
      pagination={{
        clickable: true
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {/* <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      <SwiperSlide>Slide 5</SwiperSlide>
      <SwiperSlide>Slide 6</SwiperSlide>
      <SwiperSlide>Slide 7</SwiperSlide>
      <SwiperSlide>Slide 8</SwiperSlide>
      <SwiperSlide>Slide 9</SwiperSlide> */}
      {listItems}
    </Swiper>
  );
}
