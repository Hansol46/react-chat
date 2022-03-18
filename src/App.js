import React, { useReducer, useEffect } from "react";
// Api
import { api } from "./api";
// Components
import { Login } from "./Components/Login";
import { Chat } from "./Components/Chat";

import { socket } from "./socket";
import { rootReducer } from "./reducer";

/**
 * Главный компонент приложения
 */
export const App = () => {
  /**
   * States
   */
  const [state, dispatch] = useReducer(rootReducer, {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
  });

  /**
   * Functions
   */
  const onLogin = async (loginData) => {
    const { data } = await api.getRooms(loginData.roomId);

    dispatch({
      type: "JOINED",
      payload: loginData,
    });

    socket.emit("ROOM:JOIN", loginData);

    dispatch({
      type: "SET_DATA",
      payload: data,
    });
  };

  const setUsers = (users) => {
    dispatch({
      type: "SET_USERS",
      payload: users,
    });
  };

  const addMessage = (message) => {
    dispatch({
      type: "NEW_MESSAGE",
      payload: message,
    });
  };

  /**
   * Effects
   */
  useEffect(() => {
    socket.on("ROOM:SET_USERS", setUsers);
    socket.on("ROOM:NEW_MESSAGE", addMessage);
  }, []);

  window.socket = socket;

  return state.joined ? (
    <Chat {...state} onAddMessage={addMessage} />
  ) : (
    <Login onLogin={onLogin} />
  );
};
