import React from "react";
import "./Person.scss";

function Person() {
  return (
    <section className="person">
      <img
        className="outer"
        src="https://assets.aboutamazon.com/dims4/default/0865493/2147483647/strip/true/crop/1919x1080+1+0/resize/1320x743!/quality/90/?url=https%3A%2F%2Famazon-blogs-brightspot.s3.amazonaws.com%2F2e%2Fda%2F7d8a64fc43e8b08b5cc802659fc3%2Fcanyousharekindlebooks-hero-v1.jpeg"
        alt=""
      />
      <span className="person__name">Иван Иванович Иванов</span>
      <span className="person__date">01.01.1900 - 12.12.1999</span>
    </section>
  );
}

export default Person;
