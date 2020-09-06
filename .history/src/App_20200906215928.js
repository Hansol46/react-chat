import React from "react";
import "./App.css";
import io from "socket.io-client";
import LogBlock from "./Components/LogBlock";

const socket = io('http://localhost:9999')

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
