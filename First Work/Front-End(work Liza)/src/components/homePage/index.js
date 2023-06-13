import React from "react";
import "./style.css";
import "../variables.css";
import { useRef } from "react";
import { NavLink } from "react-router-dom";
import logo from "../imgs/logo-orange.png";
import bg1 from "../imgs/bg-1.png";
import bg2 from "../imgs/bg-2.png";
import wallet from "../imgs/digital_wallet 1.png";
import bg3 from "../imgs/Vector 1.svg";
import iconLogin from "../imgs/Vector.svg";
import facebook from "../imgs/facebook.svg";
import snapchat from "../imgs/snapchat.svg";
import instagram from "../imgs/instagram.svg";
import whatsupp from "../imgs/whatsupp.svg";

function HomePage() {
  const secondPart = useRef(null);
  const scrollDown = () => {
    window.scrollTo({
      top: secondPart.current.offsetTop,
      behavior: "smooth",
    });
  };
  return (
    <div className="home-page">
      <div className="home-wrapper">
        <div className="home-first-part">
          <div className="top-panel">
            <NavLink to="/" className="home-page-link">
              <img
                src={logo}
                alt="logo-orange"
                className="logo-home-page"
              ></img>
            </NavLink>
            <div className="home-buttons">
              <NavLink to="/signup" className="home-link">
                <div className="sign-up-button">Sign Up</div>
              </NavLink>
              <NavLink
                to="/login"
                className="home-link"
                activeclassname="active"
              >
                <div>
                  <div className="login-button">Log In</div>
                  <img src={iconLogin} alt="icon-login"></img>
                </div>
              </NavLink>
            </div>
          </div>
          <div className="greet-wrapper">
            <h1>Hi! I am CryptoHive bot. Do you want to start?</h1>
            <div onClick={scrollDown}>Start</div>
          </div>
          <div>
            <img src={bg1} className="home-bg-1"></img>
          </div>
          <div>
            <img src={bg2} className="home-bg-2"></img>
          </div>
        </div>
        <div className="home-second-part" ref={secondPart}>
          <p className="project-description">
            CryptoHive is a project about creating a crypto wallet with an
            intelligent chatbot which will work with customers with the help of
            AI.
          </p>
          <img src={bg3} alt="graphic" className="main-graphic"></img>
          <img src={wallet} alt="wallet" className="main-wallet"></img>
          <div className="project-details">
            <ul>
              <li>Save cryptocurrency to your wallet</li>
              <li>Interact with chatbot</li>
              <li>Discover last news about crypto world</li>
              <li>Trade on the go. Anywhere, anytime</li>
            </ul>
            <p className="sign-up-text">Sign up to create your portfolio!</p>
            <NavLink to="/signup" className="home-page-link">
              <div className="get-started-button">Get Started</div>
            </NavLink>
          </div>
        </div>
        <div className="home-page-footer">
          <div>
            <div className="socials-links">
              <img src={facebook} alt="facebook"></img>
              <img src={whatsupp} alt="whatsupp"></img>
              <img src={instagram} alt="instagram"></img>
              <img src={snapchat} alt="snapchat"></img>
            </div>
            <hr />
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
