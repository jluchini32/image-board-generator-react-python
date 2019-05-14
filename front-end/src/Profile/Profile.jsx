import React, { Component } from 'react';
import EditProfile from './EditProfile';

class Profile extends Component {
    constructor(){
        super();
        this.state = {
            
        }
    }
    render(){
        // console.log(this.props, 'this.props from PROFILE')
        // const profileInfo = 
        return (
            <div>
            <h1>Profile</h1>
            <EditProfile handleRegistration={ this.props.handleRegistration }/>
            </div>
        )
    }

}

export default Profile;