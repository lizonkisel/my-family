import React from "react";
import "./CardPerson.scss";
import { useAppSelector } from "../../services/app/hooks";
import { getPerson } from "../../services/slices/personsSlice";
import useImage from "../../utils/useImage";

export default function CardPerson({ personId }: { personId: number }) {
  const person = useAppSelector((state) => getPerson(state, personId));
  console.log(person);

  const { image } = useImage(person.main_image);
  return (
    <article className="card">
      <section className="card__mainInfo">
        <img className="person__img" src={image} alt="" />
        <div className="person__main">
          <span className="person__surname">{person.surname}</span>
          <span className="person__name">
            {`${person.name} ${person.patronymic}`}
          </span>
          <span className="person__dates">
            {`${person.date_of_birth}-${person.date_of_death}`}
          </span>
        </div>
      </section>
      <section className="card__description">
        <p>Azaza</p>
      </section>
    </article>
    // <article>
    //   <p className="test">Test: {personId}</p>;
    // </article>
  );
}
