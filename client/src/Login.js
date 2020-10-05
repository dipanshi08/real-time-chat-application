import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";


function Login() {
  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  
  const enter = () => {
    console.log("login");
    navigate("app",{state:{name,group}});
  }

  const handleName = (e) => {
    setName(e.target.value)
  }
  const handleGroup = (e) => {
    setGroup(e.target.value) 
  }
  
  return (
    <div>
      <br/>
      <label>Name :</label>
      <input name="name" onChange={handleName} value={name} /><br/><br/>
      <label>Group Name :</label>
      <input name="group" onChange={handleGroup} value={group} /><br/><br/><br/>
      <button onClick={enter}> Enter </button>
    </div>
  );
}

export default Login;