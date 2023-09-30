import React from "react";
import logo from "../img/main_icon.png";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="tree-logo" />
      <q
        className="header__cite"
        cite="https://music.yandex.ru/album/2278447/track/20165370"
      >
        Чтобы стоять, я должен держаться корней
      </q>
    </header>
  );
}

export default Header;
