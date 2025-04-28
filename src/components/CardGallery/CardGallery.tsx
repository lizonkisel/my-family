import React from "react";
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
    return <img className="gallery__item" src={image} alt="" key={v4()} />;
  });

  return <div className="keen-slider"> {listItems} </div>;
}
