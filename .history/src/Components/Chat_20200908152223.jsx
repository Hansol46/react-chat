import React, { useState, useRef, useEffect } from "react";
import socket from "../socket";
import "../App.css";

function Chat({ users, messages, userName, roomId, onAddMessage }) {
  const [messageValue, setMessageValue] = React.useState("");
  const messagesRef = React.useRef(null);

  const onSendMessage = () => {
    socket.emit("ROOM:NEW_MESSAGE", {
      userName,
      roomId,
      text: messageValue,
    });
    onAddMessage({ userName, text: messageValue });
    setMessageValue("");
  };

  React.useEffect(() => {
    messagesRef.current.scrollTo(0, 99999);
  }, [messages]);

  // <-------- current Date ------->
  var currentTime = new Date();
  var options = {
    hour: "numeric",
    minute: "numeric",
  };
  return (
    <>
      <div className="chatBlock">
        <div className="chatMain">
          <div>
            <h3>Комната №{roomId} </h3>
          </div>
          
          {/* Users block */}
          <div className="chatMainUsers">
            <h5>Пользователей онлайн ({users.length}): </h5>
            {users.map((name, index) => (
              <span> {name}, &nbsp;</span>
            ))}
          </div>

          {/* Chat block */}
          <div ref={messagesRef} className="messages">
            {messages.map((message, index) => (
              <div className="message" key={message + index}>
                <div className="messageText">
                  <p>
                    {message.userName}
                    <span className="date">
                      ({currentTime.toLocaleString("ru", options)})
                    </span>
                    :
                  </p>
                  <span className="text"> &nbsp; {message.text}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Form block */}
          <form>
            <textarea
              value={messageValue}
              onChange={(e) => setMessageValue(e.target.value)}
              className="form-control"
              rows="3"
            ></textarea>
            <button
              onClick={onSendMessage}
              type="button"
              className="btn btn-primary"
            >
              Отправить
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Chat;
