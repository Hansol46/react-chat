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
  
  // useEffect( () => {
  //   messageRef.current.scrollTo(0, 99999)
  // }, [messages])
  return (
    <>
    <div className='chatBlock'>

    
        <h1>Online {users.length}</h1>
        {users.map( name => (<li>{name}</li>))}


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
