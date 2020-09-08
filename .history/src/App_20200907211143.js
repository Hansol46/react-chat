import React, { useReducer, useEffect } from "react";
import "./App.css";
import LogBlock from "./Components/LogBlock";
import socket from './socket'
import reducer from './reducer'
import Chat from "./Components/Chat";

function App() {


  const [state, dispatch] = useReducer(reducer, {
    isAuth: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
  })


  const onLogin = (loggerData) => {
    dispatch({
      type: 'IS_AUTH',
      payload: loggerData,
    })
  socket.emit('ROOM: JOIN', loggerData) // отправить сокет запрос на бекэнд 
  }

  window.socket =socket;
  console.log(state)
  

  useEffect( ()=> {
    socket.on('ROOM: JOINED', (users) => {
      dispatch({
        type: 'SET_USERS',
        payload: users,
      })
    })
  })


  return (

    // <div className="App">
    <>
      {!state.isAuth ? <LogBlock onLogin={onLogin}/> : <Chat state={state} />}
    </>
    // </div>

  );
}

export default App;
