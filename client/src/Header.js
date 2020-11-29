import React from 'react';
import { navigate } from "@reach/router";
import './App.css';

function Header(props) {
  const name = sessionStorage.getItem('username');
  const activeTab = props.active;
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light header">
        <div class="collapse navbar-collapse" >
            <div class="navbar-nav">
            {activeTab==='dashboard'
            ? <a class="nav-item nav-link active" href="/dashboard">Dashboard </a>
            : <a class="nav-item nav-link " href="/dashboard">Dashboard </a>
            }
            {activeTab==='changepassword'
            ? <a class="nav-item nav-link active" href="/changepassword">Change Password</a>
            : <a class="nav-item nav-link" href="/changepassword">Change Password</a>
            }
            {activeTab==='logout'
            ? <a class="nav-item nav-link active" href="/">Logout</a>
            : <a class="nav-item nav-link" href="/">Logout</a>
            }
            </div>
        </div>
        <h4 class="navbar-brand" href="#">{name}</h4>
    </nav>
  );
}

export default Header;