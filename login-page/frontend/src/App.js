import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import logo from './logo.svg';
import Login from "./components/login.component"
import SignUp from "./components/signup.component"

export default class App extends React.Component {
  constructor() {
    super()
    
    
  }
  
  
  
  render() {
    return(
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <img src={logo} className="App-logo" width="75px" height="75px" />
            <Link to="/" className="navbar-brand">MERN Login Page</Link>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">Sign Up</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Route path="/" exact component={null} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
        </div>
      </Router>
    )
  }
}
