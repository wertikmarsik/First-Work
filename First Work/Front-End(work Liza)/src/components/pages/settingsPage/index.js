import React from "react";
import { useState, useRef } from "react";
import "./style.css";
import "../../variables.css";
import Topbar from "../../topBar";
import Navbar from "../../navbar";
import hive1 from "../../imgs/hive1.svg";
import hive2 from "../../imgs/hive2.svg";

function SettingsPage() {
  const clicked1 = useRef(null);
  const [droplist, setDroplist] = useState(false);

  const changebullet = () => {
    if (droplist) {
      setDroplist(false);
    }
    if (!droplist) {
      setDroplist(true);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="main-page">
        <div className="main-wrapper">
          <Topbar />
          <div className="page-name">Settings Page</div>
          <div>
            <ul className="settings">
              <li ref={clicked1} onClick={changebullet}>
                <img src={droplist ? hive2 : hive1} alt="hive"></img>Profile
                settings
              </li>
              <div
                className={
                  droplist ? "settings-elements active-el" : "settings-elements"
                }
              >
                <div className="settings-element">Change profile photo</div>
                <div className="settings-element">Change nickname</div>
                <div className="settings-element">Review activity</div>
              </div>
              <li>
                <img src={hive1} alt="hive1"></img>Security
              </li>
              <li>
                <img src={hive1} alt="hive1"></img>Payment methods
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
