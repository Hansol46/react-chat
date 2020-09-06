import React from "react";
import "./App.css";
import LogBlock from "./Components/LogBlock";
import socket from '../socket'

function App() {
  // const connectSocket = () => {
  //   io("http://localhost:9999");
  // };
  return (
    <div className="App">

      <LogBlock />

    </div>
  );
}

export default App;
