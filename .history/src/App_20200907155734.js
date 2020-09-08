import React, { useReducer } from "react";
import "./App.css";
import LogBlock from "./Components/LogBlock";
import socket from './socket'

function App() {
  const [state, dispatch] = useReducer({
    isAuth: false,
  })
  const onLogin = () => {
    dispatch()
  }
  return (
    <div className="App">

      <LogBlock />

    </div>
  );
}

export default App;
