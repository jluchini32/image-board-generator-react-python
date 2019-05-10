import React, { Component } from 'react';
import EditProfile from './EditProfile';

class Profile extends Component {
    constructor(){
        super();
        this.state = {
            
        }
    }
    render(){
        return (
            <div>
            <h1>Profile</h1>
            <EditProfile />
            </div>
        )
    }

}

export default Profile;