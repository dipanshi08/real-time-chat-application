import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { navigate } from "@reach/router";
const ENDPOINT = "http://localhost:4001";
const socket = socketIOClient(ENDPOINT);

function App(props) {
  const name = props.location.state.name;
  const group = props.location.state.group;
  const [text, setText] = useState("");
  const [typing, setTyping] = useState("");
  const [chat,setChat] = useState([]);
  
  useEffect(() => {
    socket.open();
    socket.username=name;
    socket.emit("join",{name,group});
    socket.on("send", (data) => {
      var n = data.name;
      var t = data.text;
      if(n===name)
        var msg = "You : "+ t;
      else
        var msg = n+" : "+ t;
      setChat(chat => [...chat, msg])
    });

    socket.on('user-joined', (data) => {
      var msg = data +" joined the group :)";
      setChat(chat => [...chat, msg])
    });

    socket.on('user-left', (data) => {
      var msg = data +" left the group :(";
      setChat(chat => [...chat, msg])
    });

    socket.on("typing", (data) => {
      setTyping(data.msg);
    });

    socket.on("get-data", (data) => {
      console.log(data);
    })

    return () => {
      socket.disconnect(group);
    }
  }, []);

  const send = () => {
    socket.emit("send",{name,text,group});
    setText("");
  }

  const leave = () => {
    if(window.confirm("Do you really want to leave ?")){
      socket.emit("leave",{name,group});
      socket.close()
      navigate("/");
    }
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

  const get = () => {
    socket.emit("get");
  }
  
  return (
    <div className="container">
      <button onClick={leave} className="btn"> Exit </button> <br/><br/>
      <div className="jumbotron">
        <p>Hello {name}, Welcome to {group} ! </p>
        <input className="col-8" name="text" type="text" onChange={handleText} value={text} onFocus={handleTyping} onBlur={handleBlur} placeholder="Enter your message ..."/>
        <button className="btn btn-primary offset-1" onClick={send}>  Send </button>
        
        <br/><br/>

      </div>
      <div className="card">
        <div className="card-body">
          {chat.map(msg => (
            <p>{msg}</p>
          ))}
          <span>{typing}</span>
        </div>
      </div>
      
      
    </div>
  );
}

export default App;

//<button onClick={get}> Get </button>