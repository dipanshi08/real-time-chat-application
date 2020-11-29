import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import axios from 'axios';
import './App.css';
const ENDPOINT = process.env.REACT_APP_DOMAIN;

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isMatch, setIsMatch] = useState("");

  const enter = (e) => {
    e.preventDefault();
    console.log("login");
    const newUser = {
      username,
      password,
      email,
    }
    console.log(newUser);
    var config = {
      method: 'post',
      url: ENDPOINT + '/users/add',
      headers: {
        ContentType: "application/json"
      },
      data: newUser,
      
    }
    
    axios(config)
      .then(res =>{
        console.log(res.data)
        navigate("/");
      })
      .catch((error) => {
        console.log(error)
      });

    //navigate("dashboard",{state:{name}});
  }

  const handleUsername = (e) => {
    setUsername(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value) 
  }
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value) 
    if(password === e.target.value){
      setIsMatch("")
    }
    else{
      setIsMatch("*Passwords do not match")
    }
  }
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  
  return (
    <div className="login container-fluid login-page" >
    <div className="row main" >
    <div className="col-10 col-md-4 mx-auto ">
    <div className="logo row justify-content-center">
        <h1>hello!</h1>
    </div>
    <div className="card login-card">
    <div className="card-body">
      <div className="row justify-content-center">
        <h1>REGISTER</h1>
      </div>
      <br/><br/>
      <form onSubmit={enter}>
      <div className="row justify-content-center">
        <label className="col-5 col-md-4  " hidden >User Name :</label>
        <input className="login-input col-8" 
          name="username" 
          onChange={handleUsername} 
          value={username} 
          placeHolder="User Name"
          required
        />
      </div>
      <br/>
      <div className="row justify-content-center">
        <label className="col-5 col-md-4" hidden>Password :</label>
        <input className="login-input col-8" 
          name="password" 
          onChange={handlePassword} 
          value={password} 
          placeHolder="Password" 
          type="password"
          required
        />
      </div>
      <br/>
      <div className="row justify-content-center">
        <label className="col-5 col-md-4" hidden>Confirm Password :</label>
        <input className="login-input col-8" 
          name="confirmPassword" 
          onChange={handleConfirmPassword} 
          value={confirmPassword} 
          placeHolder="Confirm Password" 
          type="password"
          required
        />
        
      </div>
      <div className="row justify-content-center">
        <span className="isMatch " >{isMatch}</span>
      </div>
      <br/>
      <div className="row justify-content-center">
        <label className="col-5 col-md-4" hidden>Email :</label>
        <input className="login-input col-8" 
          name="email" 
          onChange={handleEmail} 
          value={email} 
          placeHolder="Email" 
          type="email"
          required
        />
      </div>
      <br/>
      <div className="row justify-content-center">
      <button className="btn btn-dark col-6 col-md-4" type="submit" > Enter </button>
      </div>
      </form>
    </div>  
    <div className="row justify-content-center">
        <button className="links" onClick={() => {navigate("/")}}>Already have an account? Login.</button>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
}

export default Register;