import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "https://say-hey-server.herokuapp.com";
const socket = socketIOClient(ENDPOINT);

function App(props) {
  const name = props.location.state.name;
  const group = props.location.state.group;
  const [text, setText] = useState("");
  const [typing, setTyping] = useState("");
  const [chat,setChat] = useState([]);
  

  useEffect(() => {

    socket.emit("subscribe",group);
    
    socket.on("send", (data) => {
      //chat.concat(data);
      //alert(chat)
      var n = data.name;
      var t = data.text;
      if(n===name)
        var msg = "You : "+ t;
      else
        var msg = n+" : "+ t;
      setChat(chat => [...chat, msg])
    });

    socket.on('user joined', (data) => {
      var msg = data +" joined the group !";
      setChat(chat => [...chat, msg])
    });

    socket.on("typing", (data) => {
      setTyping(data.msg);
    });

    socket.on("left", (data) => {
      var msg = data +" left the group !";
      setChat(chat => [...chat, msg])
    });

    return () => {
      socket.disconnect(group);
    }
  }, []);

  const send = () => {
    socket.emit("send",{name,text,group});
  }

  const handleText = (e) => {
    setText(e.target.value) 
  }

  const handleTyping = () => {
    var msg = name+" is typing ...";
    socket.emit("typing",{msg,group});
  }

  const handleBlur = () => {
    var msg = "";
    socket.emit("typing",{msg,group});
  }
  
  return (
    <div>
      <br/>
      <p>Hello {name}, Welcome to {group} ! </p>
      <input name="text" type="text" onChange={handleText} value={text} onFocus={handleTyping} onBlur={handleBlur} placeholder="Enter your message ..."/>
      <button onClick={send}>  send </button>
      <br/><br/>
      
      {chat.map(msg => (
        <p>{msg}</p>
      ))}
      <span>{typing}</span>
    </div>
  );
}

export default App;