import React, { useState } from "react";
import axios from 'axios'


function LogBlock(props) {
  const [roomId, setRoomId] = useState('')
  const [userName, setUserName] = useState('')

  const onEnter = async () => {
    console.log(roomId, userName)

    const loggerData = {
      roomId,
      userName
    }
    await axios.post('/rooms', loggerData)
    props.onLogin(loggerData)
  }

  return (
    <>
    <div className="App">
          <div className="container">
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1"> Номер комнаты</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  // aria-describedby="emailHelp"
                  placeholder="Введите номер комнаты"
                  required
                  value={roomId}
                  onChange={event => setRoomId(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Ваше имя/никнейм</label>
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
              <button onClick={onEnter}  className="btn btn-primary">
                Войти
              </button>
            </form>
          </div>
    </div>
    </>
  );
}

export default LogBlock
