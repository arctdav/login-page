import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password:''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({
          [name]: value
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        console.log("Form Submitted:");
        console.log("User Email: " + this.state.email);
        console.log("User Password: " + this.state.password);

        const newUser = {
            user_email: this.state.email,
            user_password: this.state.password,
        }

        axios.post('http://localhost:4001/users/add', newUser)
            .then(res => console.log(res.data));

        this.setState({
            email: '',
            password: ''
        })
    }

    render() {
        return(
            <div className="container" style={{marginTop:"50px"}}>
              <h2>Sign Up Page</h2>
              <form onSubmit = {this.handleSubmit} style={{marginTop:"20px"}}>
                <div className="form-group">
                  <label>Email:</label>
                  <input 
                    type="email" 
                    onChange={this.handleChange}
                    className="form-control" 
                    id="email" 
                    value = {this.state.email}
                    placeholder="Enter email" 
                    name="email" />
                </div>
                <div className="form-group" style={{marginTop:"20px"}}>
                  <label>Password:</label>
                  <input 
                    type="password" 
                    onChange={this.handleChange} 
                    className="form-control" 
                    id="pwd" 
                    value = {this.state.password} 
                    placeholder="Enter password" 
                    name="password" />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
              </form>
            </div>    
        )
    }
}