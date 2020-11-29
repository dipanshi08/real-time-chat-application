import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import axios from 'axios';
import './App.css';
import Header from './Header';
const ENDPOINT = process.env.REACT_APP_DOMAIN;

function GroupsList(props) {
  const username = sessionStorage.getItem('username');
  const groups = props.location.state.groups;

  const join = (groupname) => {
  
    console.log("join");
    navigate("app",{state:{group:groupname}});

    //navigate("app",{state:{name,group}});
    //navigate("app",{state:{groupcode}});
  }

  
  return(
    <div>
    <Header active=''/>
    <div className="container-fluid group-list" >
      <br/><br/>
      <div className="row justify-content-center">
        <h1>List of Groups</h1>
      </div>
      <hr/>
      {groups.map(group => (
        <div className="row" >
          <div className="card col-5 col-md-5 mx-auto ">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h3>{group.groupname}</h3>
                </div>
                <button className="btn btn-dark col col-2 "  onClick={() => join(group.groupname) }> Join </button>
              </div>
              <div className="row">
                <p className="description col">Host: {group.hostname}</p>
              </div>
            </div>  
          </div>
        </div>
        
      ))}
    </div>
    </div>
  );
}

export default GroupsList;