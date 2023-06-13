import React from "react";
import "./style.css";
import notifications from "../imgs/bell.svg";
import language from "../imgs/globe2.svg";

function Topbar() {
  return (
    <div className="top-bar">
      <div className="bar-wrapper">
        <div className="icons">
          <img src={notifications} alt="notifications-icon" />
          <img src={language} alt="language-icon" />
        </div>
      </div>
    </div>
  );
}

export default Topbar;
