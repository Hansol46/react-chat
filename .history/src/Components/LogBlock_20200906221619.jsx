import React from "react";
import socket from '.././socket'


function LogBlock() {
  return (
    <>
      <div className="container">
        <form>
          <div className="form-group">
            <label for="exampleInputEmail1"> Номер комнаты</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Введите номер комнаты"
              required
            />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Ваше имя/никнейм</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Введите ваше имя"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Войти
          </button>
        </form>
      </div>
    </>
  );
}

export default LogBlock
