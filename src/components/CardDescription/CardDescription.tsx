import React from "react";
import "./CardDescription.scss";
import descriptions from "../../data/description.json";

export default function CardDescription({ personId }: { personId: number }) {
  const currentDesc = descriptions.find((elem: any) => {
    return elem.id === personId;
  })?.description;

  if (currentDesc) {
    const listItems = currentDesc.map((desc) => (
      <p className="description__elem">{desc}</p>
    ));
    return <div className="card__description">{listItems}</div>;
  }

  return <p>К сожалению, мы пока ничего не знаем об этом человеке</p>;
}
