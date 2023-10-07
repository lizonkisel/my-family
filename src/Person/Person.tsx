import React from "react";
import "./Person.scss";

interface IPerson {
  imageLink?: string;
  name?: string;
  date?: string;
}

function Person({
  imageLink = "https://www.coloradospecialties.com/wp-content/uploads/2013/12/Person.Ashley.jpg",
  name = "Иван Иванович Иванов",
  date = "01.01.1900 - 12.12.1999"
}: IPerson) {
  return (
    <section className="person">
      <img className="person__image" src={imageLink} alt="person" />
      <span className="person__name">{name}</span>
      <span className="person__date">{date}</span>
    </section>
  );
}

export default Person;
