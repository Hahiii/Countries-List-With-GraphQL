import React from "react";
import World from "../../images/world.png";
import "./index.css";

function Header() {
  return (
    <div className="site-header">
      <h1 className="site-header__title">Countries</h1>
      <img className="site-header__icon" src={`${World}`} alt="earth icon" />
    </div>
  );
}

export default Header;
