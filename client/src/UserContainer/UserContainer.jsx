import React, { Component } from 'react';
import Login from './Login/Login';
import Register from './Register/Register';

class UserContainer extends Component {
    
    render(){
        return(
            <div>
                    <div>
                        <Register handleRegister={ this.props.handleRegister } />
                        <hr />
                        <Login handleLogin={ this.props.handleLogin } />
                    </div>
            </div>
        )
    }
}

export default UserContainer;