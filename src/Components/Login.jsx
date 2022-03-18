import React, { useState } from "react";
// Api
import { api } from "../api";

/**
 * @deprecated
 * Компонент отображающий блок авторизации
 */
export const Login = ({ onLogin }) => {
  /**
   * States
   */
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");

  /**
   * Functions
   */
  const onEnter = async () => {
    if (!roomId || !userName) {
      return alert("Неверные данные");
    }

    await api.createRoom({ roomId, userName });

    onLogin({
      roomId,
      userName,
    });
  };

  return (
    <div className="App">
      <div className="formEnter">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1"> Номер комнаты</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Введите номер комнаты"
            required
            value={roomId}
            onChange={(event) => setRoomId(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Ваше имя/никнейм</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Введите ваше имя"
            required
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                onEnter();
              }
            }}
          />
        </div>

        <button onClick={onEnter} className="btn btn-primary" type="submit">
          Войти
        </button>
      </div>
    </div>
  );
};
