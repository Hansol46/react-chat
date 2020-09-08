import React, { useState } from "react";
import socket from '.././socket'
import Axios from 'axios'


function LogBlock(props) {
  const [roomId, setRoomId] = useState('')
  const [userName, setUserName] = useState('')

  const onEnter = () => {
    console.log(roomId, userName)

    const loggerData = {
      roomId,
      userName
    }

    Axios.post('/rooms', loggerData).then(()=> {
      props.onLogin(loggerData)
    })
  }

  return (
    <>
      <div className="container">
        <form>
          <div className="form-group">
            <label for="exampleInputEmail1"> Номер комнаты</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Введите номер комнаты"
              required
              value={roomId}
              onChange={event => setRoomId(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Ваше имя/никнейм</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Введите ваше имя"
              required
              value={userName}
              onChange={event => setUserName(event.target.value)}
            />
          </div>
          <button onClick={onEnter} type="submit" className="btn btn-primary">
            Войти
          </button>
        </form>
      </div>
    </>
  );
}

export default LogBlock
