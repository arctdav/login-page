import React from 'react';
import axios from 'axios';

export default class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4001/users/'+this.props.match.params.id)
            .then(res => {
                this.setState({
                    email: res.data.user_email,
                    password: res.data.user_password
                })
            })
            .catch(function(err) {
                console.log(err);
            })
        console.log("edit-user componentDidMount")
    }

    handleChange(e) {
        const {name, value} = e.target;
        console.log(`name: ${name} value: ${value}`)
        this.setState({
            [name]: value
        });
        console.log("edit-user handleChange")
        console.log(this.state)
    }

    handleSubmit(e) {
        e.preventDefault();
        const updatedUser = {
            user_email: this.state.email,
            user_password: this.state.password
        };
        axios.post('http://localhost:4001/users/update/'+this.props.match.params.id, updatedUser)
            .then(res => console.log(res.data));

        this.props.history.push('/');
        window.location.reload();
    }

    render() {
        return(
            <div className="container" style={{marginTop:"50px"}}>
              <h2>Update User Page</h2>
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
                    type="text" 
                    onChange={this.handleChange} 
                    className="form-control" 
                    id="pwd" 
                    value = {this.state.password} 
                    placeholder="Enter password" 
                    name="password" />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
              </form>
            </div>
        )
    }
}