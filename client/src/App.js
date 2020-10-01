import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";
const socket = socketIOClient(ENDPOINT);

function App() {
  const [response, setResponse] = useState("");
  

  useEffect(() => {
    
    socket.on("FromAPI", data => {
      setResponse(data);
    });
    
    socket.on("broad", data => {
      alert(data);
    });

    return () => socket.disconnect();
  }, []);

  const send = () => {
    //const socket = socketIOClient(ENDPOINT);
    socket.emit("send","hello!");
    
  }

  return (
    <div>
      <p>
        It's <p >{response}</p>
      </p>
      <button onClick={() => send()}>send</button>
    </div>
  );
}

export default App;