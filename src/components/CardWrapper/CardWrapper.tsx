import React from "react";
// import CardPerson from "../CardPerson/CardPerson";
import { getActiveCard } from "../../services/slices/activeCardSlice";
import { useAppSelector } from "../../services/app/hooks";

export default function CardWrapper() {
  const activeCard = useAppSelector(getActiveCard);
  console.log(activeCard);
  if (activeCard) {
    // return <CardPerson personId={activeCard} />;
    <div> </div>;
  }
  return <div> </div>;
}
