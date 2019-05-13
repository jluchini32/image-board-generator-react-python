import React, { Component } from 'react';

class Login extends Component {
    constructor(){
        super();
        this.state = {
            username: "",
            password: ""
        }
    }
    render(){
        return(
            <div>
                <h1>Login</h1>
                <form>
                    <div>*username: <input type="text" name="username" /></div>
                    <div>*password: <input type="password" name="password" /></div> 
                    <div><small>*required</small></div>
                </form>
            </div>
        )
    }
}

export default Login;