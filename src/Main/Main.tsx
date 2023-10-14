import React from "react";
import "./Main.css";

import { Component } from "../Canvas/Canvas";
import OrgChartTree from "../reactd3";
// import Board from "../Board/Board";

function Main() {
  return (
    <main className="main">
      <Component />
      <OrgChartTree />
    </main>
  );
}

export default Main;
