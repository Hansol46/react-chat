import React, { useState, useRef, useEffect } from "react";
import { socket } from "../socket";


/**
 * @deprecated
 * Компонент отображающий сам чат
 */
export const Chat = ({ users, messages, userName, roomId, onAddMessage }) => {
  /**
   * States
   */
  const [messageValue, setMessageValue] = useState("");
  const messagesRef = useRef(null);

  /**
   * Constants
   */
  const currentTime = new Date();

  const options = {
    hour: "numeric",
    minute: "numeric",
  };

  /**
   * Functions
   */
  const onSendMessage = () => {
    socket.emit("ROOM:NEW_MESSAGE", {
      userName,
      roomId,
      text: messageValue,
    });
    onAddMessage({ userName, text: messageValue });
    setMessageValue("");
  };

  /**
   * Effects
   */
  useEffect(() => {
    messagesRef.current.scrollTo(0, 99999);
  }, [messages]);

  return (
    <div className="chatBlock">
      <div className="chatMain">
        <div>
          <h3>
            Комната №&nbsp; <span> {roomId} </span>{" "}
          </h3>
        </div>

        <div className="chatMainUsers">
          <h5>Пользователей онлайн ({users.length}): </h5>

          {users.map((name, index) => (
            <span key={name + index}> {name}, &nbsp;</span>
          ))}
        </div>

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

        <form>
          <textarea
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
            className="form-control"
            rows="3"
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                onSendMessage();
              }
            }}
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
  );
};
