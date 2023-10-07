import React from "react";
import "./Main.css";

import { Component } from "../Canvas/Canvas";
import Encharts from "../enchartsTest";
// import Board from "../Board/Board";

function Main() {
  return (
    <main className="main">
      <Component />
      <Encharts />
    </main>
  );
}

export default Main;
