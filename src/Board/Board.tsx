import React from "react";
import Person from "../Person/Person";
import "./Board.scss";

function Board() {
  return (
    <section className="board">
      <Person />
      <Person />
      <Person />
      <Person />
      <Person />
      <Person />
      <Person />
    </section>
  );
}

export default Board;
