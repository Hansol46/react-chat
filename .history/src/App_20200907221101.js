import React, { useReducer, useEffect } from "react";
import "./App.css";
import LogBlock from "./Components/LogBlock";
import socket from './socket'
import reducer from './reducer'
import Chat from "./Components/Chat";
import Axios from "axios";

function App() {


  const [state, dispatch] = React.useReducer(reducer, {
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
      socket.emit('ROOM: JOIN', loggerData) // отправить сокет запрос на бекэнд 
      const {data} = await Axios.get(`/rooms/${loggerData.roomId}`)
      setUsers(data.users)
  }

  window.socket = socket;
  console.log(state)
  
  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users,
    })
  }
  useEffect( ()=> {
    socket.on('ROOM: SET_USERS', setUsers)
  }, [])


  return (

    // <div className="App">
    <>
      {!state.isAuth ? <LogBlock onLogin={onLogin}/> : <Chat {...state}/>}
    </>
    // </div>

  );
}

export default App;
