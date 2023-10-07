import React from "react";
import Person from "../Person/Person";
import "./Board.scss";

import testImg from "../img/GrandmaNina/Nina1.jpg";
import testImg2 from "../img/GrandmaNina/Nina2.jpg";

function Board() {
  return (
    <section className="board">
      <Person imageLink={testImg} />
      <Person imageLink={testImg2} />
      <Person />
      <Person />
      <Person />
      <Person />
      <Person />
    </section>
  );
}

export default Board;
