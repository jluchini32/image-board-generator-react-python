import React, { Component } from 'react';
import Login from './Login/Login';
import Register from './Register/Register';

class UserContainer extends Component {
    constructor(){
        super();
        this.state = {

        }
    }
    handleRegister(){
        console.log('register')
    }
    render(){
        return(
            <div>
                <h1>UserContainer</h1>
                    <div>
                        <Register />
                        <hr />
                        <Login />
                    </div>
            </div>
        )
    }
}

export default UserContainer;