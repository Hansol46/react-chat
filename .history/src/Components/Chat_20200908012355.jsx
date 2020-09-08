import React, { useState, useRef, useEffect } from "react";
import socket from '../socket'
import '../App.css'


function Chat ({users, messages, userName, roomId, onAddMessage}) {
  const [messageValue, setMessage] = useState('')
  const messageRef = useRef(null)
  
  const onSendMessage = () => {
    socket.emit('ROOM: NEW_MESSAGE', {
      userName,
      roomId,
      text: messageValue,
    })
    onAddMessage({ userName, text: messageValue})
    setMessage('')
  }
  
  useEffect( () => {
    messageRef.current.scrollTo(0, 99999)
  }, [messages])
  return (
    <>
    <div className='chatBlock'>

        <div className='chatMain'>

          <div>
            <h1>Комната №{roomId} </h1>  
          </div>

          <div>
            <h3>Online {users.length}</h3>
            <ul>
              {users.map( name => (<li>{name}</li>))}
            </ul>
          </div>
          
          <div ref={messageRef} className="messages">
                  {messages.map((message) => (
                    <div className="message">
                      <div className="messageText">
                        <p>{message.userName} :</p><span>{message.text}</span> 
                      </div>
                     
                    </div>
                  ))}
          </div>


          <form>
          <textarea
            value={messageValue}
            onChange={(e) => setMessage(e.target.value)}
            className="form-control"
            rows="3"></textarea>
          <button onClick={onSendMessage} type="button" className="btn btn-primary">
            Отправить
          </button>
        </form>


        </div>
        


        {/* <div ref={messageRef}>
          {messages.map(m => (
            <div>
            <p>{m.text} </p>  
            
            <span>{m.userName}</span>
            </div>
          ))}


          <form>
            <textarea 
            value={messageValue}
            onChange={event => setMessage(event.target.value)}
            className={'formChat'}
            ></textarea>
            <button onClick={onSendMessage} type='button'>отправить</button>
          </form>

        </div> */}
    </div>
    </>
  );
}

export default Chat
