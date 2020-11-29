import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import axios from 'axios';
import './App.css';
import Header from './Header';
const ENDPOINT = process.env.REACT_APP_DOMAIN;

function ChangePassword() {
  const username = sessionStorage.getItem('username');
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMatch, setIsMatch] = useState("");

  const enter = (e) => {
    e.preventDefault();
    const data = {
      username,
      oldPassword,
      newPassword,
    }
    console.log(data);
    var config = {
      method: 'post',
      url: ENDPOINT + '/users/changepassword',
      headers: {
        ContentType: "application/json"
      },
      data: data,
    }
    
    axios(config)
      .then(res => alert(res.data))
      .catch((error) => {
        console.log(error)
      });

    //navigate("dashboard",{state:{name}});
  }

  const handleOldPassword = (e) => {
    setOldPassword(e.target.value) 
  }
  const handleNewPassword = (e) => {
    setNewPassword(e.target.value) 
  }
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value) 
    if(newPassword === e.target.value){
      setIsMatch("")
    }
    else{
      setIsMatch("*Passwords do not match")
    }
  }
  
  
  return (
    <div>
    <Header active='changepassword'/>
    <div className="container-fluid login-page" >
    <div className="row main" >
    <div className="col-10 col-md-4 mx-auto ">
    <div className="card login-card">
    <div className="card-body">
      <div className="row justify-content-center">
        <h1>CHANGE PASSWORD</h1>
      </div>
      <br/><br/>
      <form onSubmit={enter}>
      <div className="row justify-content-center">
        <label className="col-5 col-md-4" hidden>Old Password :</label>
        <input className="login-input col-8" 
          name="oldpassword" 
          onChange={handleOldPassword} 
          value={oldPassword} 
          placeHolder="Old Password" 
          type="password"
          required
        />
      </div>
      <br/>
      <div className="row justify-content-center">
        <label className="col-5 col-md-4" hidden>New Password :</label>
        <input className="login-input col-8" 
          name="newpassword" 
          onChange={handleNewPassword} 
          value={newPassword} 
          placeHolder="New Password" 
          type="password"
          required
        />
      </div>
      <br/>
      <div className="row justify-content-center">
        <label className="col-5 col-md-4" hidden>Confirm New Password :</label>
        <input className="login-input col-8" 
          name="confirmPassword" 
          onChange={handleConfirmPassword} 
          value={confirmPassword} 
          placeHolder="Confirm New Password" 
          type="password"
          required
        />
        
      </div>
      <div className="row justify-content-center">
        <span className="isMatch " >{isMatch}</span>
      </div>
      <br/>
      <div className="row justify-content-center">
      <button className="btn btn-dark col-6 col-md-4" type="submit" > Enter </button>
      </div>
      </form>
    </div>  
    </div>
    </div>
    </div>
    </div>
    </div>
  );
}

export default ChangePassword;