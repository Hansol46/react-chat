import React from 'react';
import './App.css';
import io from 'socket.io-client'


const socket = io('http://localhost:9999')
function App() {
  return (
    <div className="App">
      <h1>HELLOOO!</h1>
    </div>
  );
}

export default App;
