import React, { useReducer, useEffect } from "react";
// Api
import { api } from "./api";

import { LogBlock } from "./Components/LogBlock";
import { socket } from "./socket";
import { rootReducer } from "./reducer";
import Chat from "./Components/Chat";

export const App = () => {
  const [state, dispatch] = useReducer(rootReducer, {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
  });

  const onLogin = async (loginData) => {
    dispatch({
      type: "JOINED",
      payload: loginData,
    });

    socket.emit("ROOM:JOIN", loginData);

    const { rooms } = await api.getRooms(loginData.roomId);

    dispatch({
      type: "SET_DATA",
      payload: rooms,
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

  useEffect(() => {
    socket.on("ROOM:SET_USERS", setUsers);
    socket.on("ROOM:NEW_MESSAGE", addMessage);
  }, []);

  window.socket = socket;

  return state.joined ? (
    <Chat {...state} onAddMessage={addMessage} />
  ) : (
    <LogBlock onLogin={onLogin} />
  );
};
