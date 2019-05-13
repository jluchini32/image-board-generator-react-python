import React, { Component } from 'react';
import Login from './Login/Login';
import Register from './Register/Register';

class UserContainer extends Component {
    constructor(){
        super();
        this.state = {

        }
    }
    render(){
        return(
            <div>
                <h1>UserContainer</h1>
                    <div>
                        <Register />
                    </div>
            </div>
        )
    }
}

export default UserContainer;