import React, { useState } from "react";
// import socket from '.././socket'


function Chat ({users, messages}) {
  return (
    <>
<h1>Online {users.length}</h1>
{users.map( name => {
    <li>{name}  </li>

})}
    </>
  );
}

export default Chat
