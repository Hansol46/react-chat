import React, { useReducer } from "react";
import "./App.css";
import LogBlock from "./Components/LogBlock";
import socket from './socket'

function App() {
  const [state, dispatch] = useReducer({
    isAuth: false,
  })
  const onLogin = () => {
    dispatch({
      type: 'IS_AUTH',
      payload: true
    })
  }
  return (
    <div className="App">

      <LogBlock onLogin={onLogin}/>

    </div>
  );
}

export default App;
