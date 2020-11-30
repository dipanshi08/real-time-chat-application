import React, { useState, useEffect } from "react";
import axios from 'axios';
import { navigate } from "@reach/router";
import './App.css';
const ENDPOINT = process.env.REACT_APP_DOMAIN;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isMatch, setIsMatch] = useState("");
  
  const enter = (e) => {
    e.preventDefault();    
    const newUser = {
      username,
      password
    }
    var config = {
      method: 'post',
      url: ENDPOINT + '/users/login',
      headers: {
        "Content-Type": "application/json",
      },
      data: newUser,
    }
    
    axios(config)
      .then(res => {
        if(res.data === "success"){
          sessionStorage.setItem('username', username)
          navigate("dashboard",{state:{username}})
        }
        else
          setIsMatch("*Incorrect username or password")
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
  
  const forgotPassword = () => {
    console.log(username)
    if(username==="")
      setIsMatch("*Enter username");
    else{
      var config = {
        method: 'get',
        url: ENDPOINT + '/users/forgotpassword/'+username,
        headers: {
          "Content-Type": "application/json"
        }
      }
      
      axios(config)
        .then(res => {
          if(res.data === "nouser"){
            setIsMatch("*Incorrect username")
          }
          else
            console.log(res.data)
        })
        .catch((error) => {
          console.log(error)
        });

      //navigate("dashboard",{state:{name}});
      alert("We have sent a one time use password to the email ID linked with your account. You can change the password once you login with those credentials.");
    }
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
        <h1>LOGIN</h1>
      </div>
      <br/><br/>
      <div className="row justify-content-center">
        <span className="isMatch" >{isMatch}</span>
      </div>
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
      <button className="btn btn-dark col-6 col-md-4" onClick={enter}> Enter </button>
      </div>
    
    </div> 
    <div className="row justify-content-center">
        <button className="links" onClick={forgotPassword}>Forgot Password?</button>
    </div>
    <div className="row justify-content-center">
        <button className="links" onClick={() => {navigate("register")}}>Don't have an account? Register.</button>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
}

export default Login;