import React, { useState } from "react";
import axios from 'axios'


function LogBlock({onLogin}) {
  // const [roomId, setRoomId] = useState('')
  // const [userName, setUserName] = useState('')

  // const onEnter = async () => {
  //   const loggerData = {
  //     roomId,
  //     userName
  //   }
  //   await axios.post('/rooms', loggerData)
  //   onLogin(loggerData)
  // }
  const [roomId, setRoomId] = React.useState('');
  const [userName, setUserName] = React.useState('');
  // const [isLoading, setLoading] = React.useState(false);

  const onEnter = async () => {
    if (!roomId || !userName) {
      return alert('Неверные данные');
    }
    const obj = {
      roomId,
      userName,
    };
    // setLoading(true);
    await axios.post('/rooms', obj);
    onLogin(obj);
  };

  return (
    <>
    <div className="App">
          <div className="container">
            <div  className="formEnter">
               <div className="form-group">
                <label htmlFor="exampleInputEmail1"> Номер комнаты</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
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
            </div>

          </div>
    </div>
    </>
  );
}

export default LogBlock
