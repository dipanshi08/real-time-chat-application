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
    <div className="container jumbotron" >
      <br/>
      <label className="col-4">Name :</label>
      <input className="col-4" name="name" onChange={handleName} value={name} /><br/><br/>
      <label className="col-4">Group Name :</label>
      <input className="col-4" name="group" onChange={handleGroup} value={group} /><br/><br/>
      <button className="btn btn-primary offset-6 col-2" onClick={enter}> Enter </button>
    </div>
  );
}

export default Login;