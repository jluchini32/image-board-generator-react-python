import React, { Component } from 'react';

class EditProfile extends Component {
    constructor(){
        super();
        this.state = {
            username: "",
            password: ""
        }
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleRegister(this.state);
    };
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };
    render(){
        // console.log(this.props, 'this.props editProfile')
        return(
            <div>
                <h1>Edit Profile</h1>
                <form onSubmit={ this.handleSubmit }>
                    <div>*new username: <input onChange={ this.handleChange } type="text" name="username" /></div>
                    <div>*new password: <input onChange={ this.handleChange } type="password" name="password" /></div> 
                    <div><input type="submit" /></div>
                    <div><small>*required</small></div>
                </form>
            </div>
        )
    }

}

export default EditProfile;