import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const User = props => (
    <tr>
        <td>{ props.user.user_email }</td>
        <td>{ props.user.user_password }</td>
        <td>
            <Link to={ "/edit/"+props.user._id }>Edit</Link>
        </td>
    </tr>
)

export default class UsersList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4001/users')
            .then(res => {
                this.setState({ users: res.data });
                console.log(res.data)
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    userList() {
        return this.state.users.map(function(currUser, i) {
            return <User user={ currUser } key={ i } />
        })
    }

    render() {
        return (
            <div>
                <h3>Users List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.userList() }
                    </tbody>
                </table>
            </div>
        )
    }
}