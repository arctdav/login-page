import React from 'react';
import axios from 'axios';

export default class Login extends React.Component {
    constructor() {
        super()
        this.state = {
          email: "",
          password: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange(e) {
        const {name, value} = e.target;
        this.setState({
          [name]: value
        })
    }
      
    handleSubmit(e) {
        e.preventDefault();
        
        axios.get('http://localhost:4001/users')
            .then(res => {
                let data = res.data;
                console.log(data)

                let isSuccess = false;
                for (let i = 0; i < data.length; i++) {
                  if(data[i].user_email === this.state.email) {
                    if(data[i].user_password === this.state.password) {
                      alert("Success! your email and password is correct");
                      isSuccess = true;
                      break;
                    }
                  }
                }
                if(!isSuccess) {
                  alert("Fail! email and password incorrect");
                }
            })
            .catch(function (err) {
                console.log(err);
            })
        
    }
    
    render() {
        return(
            <div className="container" style={{marginTop:"50px"}}>
              <h2>Login Page</h2>
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
                <button type="submit" className="btn btn-primary">Login</button>
              </form>
            </div>    
        )
    }
}