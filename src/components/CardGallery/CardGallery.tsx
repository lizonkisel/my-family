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

  const list = require.context(`../../img`, true, /\.(png|jpg)$/).keys();

  let imagesArr = list.filter((img) => {
    return img.indexOf(folderRoute) !== -1;
  });

  // Вот эта штука нужна, чтобы не брать все подряд картинки для пользователя без картинок.
  // Благодаря массиву  imagesArr = ["./"], в качестве картинки карточки будет отображаться заглушка
  if (folderRoute === "") {
    imagesArr = ["./"];
  }

  const listItems = imagesArr.map((img) => {
    const slicedRoute = img.slice(2);
    console.log(slicedRoute);

    const { image } = useImage(`${slicedRoute}`);
    return (
      <SwiperSlide key={v4()}>
        <img className="gallery__item" src={image} alt="" />
      </SwiperSlide>
    );
  });

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
      {listItems}
    </Swiper>
  );
}
