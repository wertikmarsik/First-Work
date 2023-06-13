import React from "react";
import "./style.css";
import Topbar from "../../topBar";
import button from "../../imgs/send.svg";
import Navbar from "../../navbar";

function ChatBot() {
  return (
    <div>
      <Navbar />
      <div className="main-page">
        <div className="main-wrapper">
          <Topbar />
          <div className="chat">
            <div className="messages">
              <div className="message-user">Test message from user</div>
              <div className="message-bot">Test message from bot</div>
            </div>
            <div className="textarea-wrapper">
              <textarea
                className="chat-textarea"
                placeholder="What would you like to ask?"
              />
              <button className="send-button">
                <img src={button} alt="button" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
