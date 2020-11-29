import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Router, Link } from "@reach/router";
import App from './App';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import ChangePassword from './ChangePassword';
import GroupsList from './GroupsList';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Login path="/" />
      <Register path="/register" />
      <ChangePassword path="/changepassword" />
      <Dashboard path="/dashboard" />
      <GroupsList path="/groupslist" />
      <App path="/app" />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
