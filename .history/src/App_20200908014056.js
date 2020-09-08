import React, { useReducer, useEffect } from "react";
import "./App.css";
import LogBlock from "./Components/LogBlock";
import socket from './socket'
import reducer from './reducer'
import Chat from "./Components/Chat";
import axios from "axios";

function App() {
  const [state, dispatch] = useReducer(reducer, {
    isAuth: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
  })

  const onLogin = async (loggerData) => {
    dispatch({
      type: 'IS_AUTH',
      payload: loggerData,
    })
      socket.emit('ROOM: JOIN', loggerData)                         // отправить сокет запрос на бекэнд 
      const { data } = await axios.get(`/rooms/${loggerData.roomId}`)
      dispatch({
        type: 'SET_DATA',
        payload: data,
      })
  }

  // window.socket = socket;
  // console.log(state)
  
  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users,
    })
  }
  const addMessage = (message) => {
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message,
    })
  }
  useEffect( ()=> {
    socket.on('ROOM: SET_USERS', setUsers)
    socket.on('ROOM: NEW_MESSAGE', addMessage)
  }, [])

  window.socket = socket;
  
  return (

    <>
      {!state.isAuth ? <LogBlock onLogin={onLogin}/> : <Chat {...state} onAddMessage={addMessage}/>}
    </>

  );
}

export default App;
