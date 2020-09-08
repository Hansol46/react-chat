import React, { useState, useRef, useEffect } from "react";
import socket from '../socket'
import '../App.css'


function Chat ({users, messages, userName, roomId, onAddMessage}) {
  const [messageValue, setMessage] = useState('')
  const messagesRef = useRef(null)
  debugger;
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
    messagesRef.current.scrollTo(0, 99999)
  }, [messages])

  return (
    <>
    <div className='chatBlock'>

        <div className='chatMain'>

          <div>
            <h1>Комната №{roomId} </h1>  
          </div>

          <div>
            <h3>Пользователей онлайн ({users.length}): </h3>
            <ul>
              {users.map( (name, index) => (<li key={name+index}> {name} </li>))}
            </ul>
          </div>
          
          <div ref={messagesRef} className="messages">
                  {messages.map( (message,index) => (
                    <div className="message" key={message+index}>
                      <div className="messageText">
                        <p>{message.userName}:</p><span> &nbsp; {message.text}</span> 
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
