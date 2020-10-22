import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import './App.css';

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
    <div className="container-fluid " >
    <div className="row main" >
    <div className="col-10 col-md-4 mx-auto ">
    <div className="card login-card py-5">
    <div className="card-body">
      <br/>
      <div className="row justify-content-center">
        <label className="col-5 col-md-4  " hidden >Name :</label>
        <input className=".login-input col-8 col-md-7" name="name" onChange={handleName} value={name} placeHolder="Name"/>
      </div>
      <br/>
      <div className="row justify-content-center">
        <label className="col-5 col-md-4" hidden>Group Name :</label>
        <input className=".login-input col-8 col-md-7" name="group" onChange={handleGroup} value={group} placeHolder="Group"/>
      </div>
      <br/>
      <div className="row justify-content-center">
      <button className="btn btn-dark col-6 col-md-4" onClick={enter}> Enter </button>
      </div>
    </div>  
    </div>
    </div>
    </div>
    </div>
  );
}

export default Login;