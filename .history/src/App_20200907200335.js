import React, { useReducer } from "react";
import "./App.css";
import LogBlock from "./Components/LogBlock";
import socket from './socket'
import reducer from './reducer'

function App() {


  const [state, dispatch] = useReducer(reducer, {
    isAuth: false,
  })


  const onLogin = (loggerData) => {
    dispatch({
      type: 'IS_AUTH',
      payload: true,
    })

 

    socket.emit('ROOM: JOIN', loggerData) // отправить сокет запрос на бекэнд
          
  }

  return (

    <div className="App">

      {!state.isAuth && <LogBlock onLogin={onLogin}/>}

    </div>

  );
}

export default App;
