import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import axios from 'axios';
import './App.css';
import Header from './Header';
const ENDPOINT = process.env.REACT_APP_DOMAIN;

function Dashboard(props) {
  const username = sessionStorage.getItem('username');
  const [groupname, setGroupname] = useState("");
  const [groupcode, setGroupcode] = useState("");
  const [type, setType] = useState("private");

  const create = () => {
    
    console.log("create");
    const newGroup = {
      groupname,
      username,
      type
    }
    console.log(newGroup);
    var config = {
      method: 'post',
      url: ENDPOINT + '/groups/add',
      headers: {
        ContentType: "application/json"
      },
      data: newGroup,
    }
    
    axios(config)
      .then(res => alert(res.data))
      .catch((error) => {
        console.log(error)
      });
    
    //navigate("app",{state:{name,group}});
  }
  const find = () => {
  
    console.log("find");
    var config = {
      method: 'get',
      url: ENDPOINT + '/groups/public',
      headers: {
        ContentType: "application/json"
      },
    }
    
    axios(config)
      .then(res =>{
        console.log(res.data)
        navigate("groupslist",{state:{groups: res.data}})
      }) 
      .catch((error) => {
        console.log(error)
      });

    //navigate("app",{state:{name,group}});
  }
  const join = () => {
  
    console.log("join");
    var config = {
      method: 'get',
      url: ENDPOINT + '/groups/search/'+ groupcode,
      headers: {
        ContentType: "application/json"
      }
    }
    
    axios(config)
      .then(res =>{
        console.log(res.data)
        if(res.data == "success")
          navigate("app",{state:{group:groupcode}});
        else
          alert("Group doesn't extst")
      })
      .catch((error) => {
        console.log(error)
      });

    //navigate("app",{state:{name,group}});
    //navigate("app",{state:{groupcode}});
  }

  const handleType = (e) => {
    setType(e.target.value)
  }

  const handleGroupname = (e) => {
    setGroupname(e.target.value) 
  }

  const handleGroupcode = (e) => {
    setGroupcode(e.target.value) 
  }
  
  return (
    <div>
    <Header active='dashboard'/>
    <div className="container-fluid login-page" >
    
    <div className="row main dashboard" >
    <div className="card dashboard-card col-3 col-md-3 mx-auto ">
      <div className="card-body">
        <div className="row justify-content-center">
          <h1>HOST</h1>
        </div>
        <div className="row">
          <p className="col-10 offset-1 description">Create public chat rooms for anyone to join or make private chat rooms and share with friends </p>
        </div>
        <div className="row justify-content-center">
          <label className="col-5 col-md-4" hidden>Group Name:</label>
          <input className="dashboard-input col-10" name="groupname" onChange={handleGroupname} value={groupname} placeHolder="Enter Group Name" />
        </div>
        <br/>
        <div className="row justify-content-center">
          <column className="col-5 col-md-5">
          <input type="radio" id="private" name="type" value="private" onClick={handleType} checked/>
          <label for="private">Private</label><br />
          </column>
          <column className="col-5 col-md-5">
          <input type="radio" id="public" name="type" value="public" onClick={handleType} />
          <label for="public">Public</label>
          </column>
        </div>
        <br />
        <div className="row justify-content-center">
        <button className="btn btn-dark col-6 col-md-5" onClick={create}> Create Group </button>
        </div>
      </div>  
    </div>
    <div className="card dashboard-card col-3 col-md-3 mx-auto ">
      <div className="card-body">
        <div className="row justify-content-center">
          <h1>PUBLIC</h1>
        </div>
        <div className="row">
          <p className="col-10 offset-1 description">Choose from a number of public chat rooms</p>
        </div>
        <div className="row justify-content-center">
        <button className="btn btn-dark col-6 col-md-5" onClick={find}> Find Groups </button>
        </div>
      </div>  
    </div>
    <div className="card dashboard-card col-3 col-md-3 mx-auto ">
      <div className="card-body">
        <div className="row justify-content-center">
          <h1>PRIVATE</h1>
        </div>
        <div className="row">
          <p className="col-10 offset-1 description">Enter the group name to join the chat .</p>
        </div>
        <div className="row justify-content-center">
          <label className="col-5 col-md-4" hidden>Group Name:</label>
          <input className="dashboard-input col-10" name="groupcode" onChange={handleGroupcode} value={groupcode} placeHolder="Group Name" />
        </div>
        <br/>
        <div className="row justify-content-center">
        <button className="btn btn-dark col-6 col-md-5" onClick={join}> Join </button>
        </div>
      </div>  
    </div>
    </div>
    </div>
    </div>
  );
}

export default Dashboard;