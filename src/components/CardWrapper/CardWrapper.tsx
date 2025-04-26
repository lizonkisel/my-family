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
  // let activeCard;
  // useEffect(() => {
  //   activeCard = useAppSelector(getActiveCard);
  // }, []);

  const activeCard = useAppSelector(getActiveCard);
  const dispatch = useAppDispatch();

  const closePopup = () => {
    dispatch(setActiveCard(undefined));
  };

  const closePopupByOuterClick: React.MouseEventHandler<HTMLDivElement> = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closePopup();
    }
  });

  if (activeCard !== undefined) {
    return (
      <section className="popup">
        {/* eslint-disable-next-line */}
        <div className="popup__content" onClick={closePopupByOuterClick}>
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
