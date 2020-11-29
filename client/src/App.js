import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import { navigate } from "@reach/router";
import axios from 'axios';
import './App.css';
import Header from './Header';
const ENDPOINT = process.env.REACT_APP_DOMAIN;
const socket = socketIOClient(ENDPOINT);

function App(props) {
  const name = sessionStorage.getItem('username');
  const group = props.location.state.group;
  const [text, setText] = useState("");
  const [typing, setTyping] = useState("");
  const [chat,setChat] = useState([]);
  const [activeUsers,setActiveUsers] = useState([]);

  const getChat = () => {
  
    console.log("chat");
    var config = {
      method: 'get',
      url: ENDPOINT + '/groups/getchat/'+ group,
      headers: {
        ContentType: "application/json"
      }
    }
    
    axios(config)
      .then(res =>{
        console.log(res.data)
        setChat(res.data)
      })
      .catch((error) => {
        console.log(error)
      });

    //navigate("app",{state:{name,group}});
    //navigate("app",{state:{groupcode}});
  }
  
  useEffect(() => {
    socket.open();
    getChat();
    socket.username=name;
    socket.emit("join",{name,group});
    socket.emit("get",group);
    socket.on("send", (data) => {
      //var n = data.name;
      var msg = data.text;
      if(data.name===name)
        var n = "You";
      else
        var n = data.name;
      setChat(chat => [...chat, {name:n,text:data.text}])
      
    });

    socket.on('user-joined', (data) => {
      var msg = data +" joined the group :)";
      setChat(chat => [...chat, {name:data,text:"joined"}])
      socket.emit("get",group);
    });

    socket.on('user-left', (data) => {
      var msg = data +" left the group :(";
      setChat(chat => [...chat, {name:data,text:"left"}])
      socket.emit("get",group);
    });

    socket.on("typing", (data) => {
      setTyping(data.msg);
    });

    socket.on("get-data", (data) => {
      console.log(data.usersInRoom);
      setActiveUsers(data.usersInRoom);
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
      navigate("/dashboard");
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
    socket.emit("get",group);
  }
  
  const AlwaysScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
  };

  

  return (
    <div>
    <Header active=''/>
    <div className="container-fluid">
      <div className="row"><button onClick={leave} className="btn"> Exit </button><br/><br/></div>
      <div className="row">
      <div className="col-12 col-md-6 offset-md-3 ">
      <div className="card chat-card">
      <div class="card-header">
         <h5 className="text-center">{group}</h5>
      </div>
      <div className="card-body" id="cb"  >     
        <div className="card-text">

          {chat.map(msg => (
            <div  >
            {(msg.text === "joined" || msg.text === "left") ? 
            <p align="center">{msg.name} {msg.text} the chat !</p> :
            <div>
            {msg.name === "You" || msg.name === name ? 
               <p align="right">You : {msg.text}</p> :
                <p align="left">{msg.name} : {msg.text}</p>
            }
            </div>
            }
            </div>
          ))
          }
          <AlwaysScrollToBottom />
          <span>{typing}</span>
        </div>
        </div>
        <div className="card-footer py-0 px-0">
        <input className="chat-input col-10 col-xl-11" name="text" type="text" onChange={handleText} value={text} onFocus={handleTyping} onBlur={handleBlur} placeholder="Enter your message ..."/>
        { text === "" ? 
        <button className="btn btn-primary col-2 col-xl-1" onClick={send} disabled >  Send </button>
         : 
        <button className="btn btn-primary col-2 col-xl-1" onClick={send} >  Send </button>
        }
        
      </div>
      </div>
      
      </div>
      <div className="col col-md-3 ">
        <br/><br/>
        <div className="active-users">
          <h4 align='center'>Active Users</h4>
          <hr/>
          {activeUsers.map(user => (
            <h6>
            {user}
            </h6>
        ))}
        </div>
        
      </div>
      </div>
    </div>
    </div>
  );
}

export default App;

//<button onClick={get}> Get </button>