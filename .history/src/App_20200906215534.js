import React from "react";
import "./App.css";
import io from "socket.io-client";

// const socket = io('http://localhost:9999')

function App() {
  const connectSocket = () => {
    io("http://localhost:9999");
  };

  return (
    <div className="App">
      <div className="container">
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1"> Номер комнаты</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder='Введите номер комнаты'
              required
            />
            {/* <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small> */}
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Ваше имя/никнейм</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder='Введите ваше имя'
              required
            />
          </div>
          {/* <div class="form-group form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
            />
            <label class="form-check-label" for="exampleCheck1">
              Check me out
            </label>
          </div> */}
          <button type="submit" class="btn btn-primary">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
