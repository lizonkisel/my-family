import React from "react";
import "./CardWrapper.scss";
import closeIcon from "../../img/close.svg";
import CardPerson from "../CardPerson/CardPerson";
import {
  getActiveCard,
  setActiveCard
} from "../../services/slices/activeCardSlice";
import { useAppSelector, useAppDispatch } from "../../services/app/hooks";

export default function CardWrapper() {
  const activeCard = useAppSelector(getActiveCard);
  const dispatch = useAppDispatch();
  console.log(activeCard);

  const closePopup = () => {
    dispatch(setActiveCard(undefined));
  };

  const closePopupByOuterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closePopup();
    }
  });

  if (activeCard) {
    return (
      /* eslint-disable-next-line */
      <section className="popup" onClick={closePopupByOuterClick}>
        <div className="popup__content">
          <CardPerson personId={activeCard} />;
          <button className="popup__close" type="button" onClick={closePopup}>
            <img src={closeIcon} alt="cross" className="close__img" />
          </button>
        </div>
      </section>
    );
  }
  return <div> </div>;
}
