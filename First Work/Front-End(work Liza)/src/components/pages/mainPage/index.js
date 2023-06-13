import React from "react";
import "./style.css";
import "../../variables.css";
import Topbar from "../../topBar";
import Navbar from "../../navbar";
import card1 from "../../imgs/card-1.png";
import card2 from "../../imgs/card-2.png";
import card3 from "../../imgs/card-3.png";
import card4 from "../../imgs/card-4.png";
import card5 from "../../imgs/card-5.png";
import card6 from "../../imgs/card-6.png";

function MainPage() {
  return (
    <div>
      <Navbar />
      <div className="main-page">
        <div className="main-wrapper">
          <Topbar />
          <div className="main-page-wrapper">
            <div className="main-page-name">Crypto questions, answered:</div>
            <div className="cards-container">
              <div className="question-card">
                <div className="card-image">
                  <img src={card1} alt="card-image"></img>
                </div>
                <div>
                  <div className="card-title">What is Bitcoin?</div>
                  <div className="card-description">
                    The world’s first widely-adopted cryptocurrency. With
                    Bitcoin, people can securely and directly send each other
                    digital money on the internet.
                  </div>
                </div>
              </div>
              <div className="question-card">
                <div className="card-image">
                  <img src={card2} alt="card-image"></img>
                </div>
                <div>
                  <div className="card-title">What is Cryptocurrency?</div>
                  <div className="card-description">
                    Bitcoin, Ethereum, and other crypto are revolutionizing how
                    we invest, bank, and use money. Read this beginner’s guide
                    to learn more.
                  </div>
                </div>
              </div>
              <div className="question-card">
                <div className="card-image">
                  <img src={card3} alt="card-image"></img>
                </div>
                <div>
                  <div className="card-title">
                    What is the Lightning Network?
                  </div>
                  <div className="card-description">
                    A beginner’s guide to the “layer 2” technology that’s making
                    bitcoin payments faster and cheaper.
                  </div>
                </div>
              </div>

              <div className="question-card">
                <div className="card-image">
                  <img src={card4} alt="card-image"></img>
                </div>
                <div>
                  <div className="card-title">What is Ethereum?</div>
                  <div className="card-description">
                    Ethereum is the second-biggest cryptocurrency by market cap
                    after Bitcoin. It is also a decentralized computing platform
                    that...
                  </div>
                </div>
              </div>
              <div className="question-card">
                <div className="card-image">
                  <img src={card5} alt="card-image"></img>
                </div>
                <div>
                  <div className="card-title">7 biggest Bitcoin myths</div>
                  <div className="card-description">
                    With Bitcoin hitting new all-time highs and major news
                    breaking almost every day, it seemed like a good time to
                    look at some...
                  </div>
                </div>
              </div>
              <div className="question-card">
                <div className="card-image">
                  <img src={card6} alt="card-image"></img>
                </div>
                <div>
                  <div className="card-title">What is inflation?</div>
                  <div className="card-description">
                    Inflation is the process by which a currency like the dollar
                    or Euro loses value over time, causing the price of goods to
                    rise. Bitcoin (and some other cryptocurrencies) are...
                  </div>
                </div>
              </div>
            </div>
            <div className="explore-more-btn">
              <div>Explore more</div>
              <div>→</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
