import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import CardWrapper from "./components/CardWrapper/CardWrapper";

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
      <CardWrapper />
    </div>
  );
}

export default App;
