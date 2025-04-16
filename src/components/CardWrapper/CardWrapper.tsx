import React from "react";
// import CardPerson from "../CardPerson/CardPerson";
import { getActiveCard } from "../../services/slices/activeCardSlice";
import { useAppDispatch } from "../../services/app/hooks";

export default function CardWrapper() {
  const dispatch = useAppDispatch();

  const activeCard = dispatch(getActiveCard()) || 0;
  console.log(activeCard);
  return (
    // <>
    //   {
    //     activeCard ?
    //       ( <CardPerson personId={activeCard} /> )
    //     :
    //     ( <div> </div>)
    //   }
    // </>
    <div>Test</div>
  );
}
