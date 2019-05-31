import React, { Component } from 'react';
import './App.css';
import BoardContainer from './BoardContainer/BoardContainer';
// import Profile from './Profile/Profile';
import UserContainer from './UserContainer/UserContainer';

class App extends Component {
  constructor(){
    super();
    this.state = {
      loggedIn: false,
      currentUser: null,
      currentUserBoards: []
    }
  }
  handleRegister = async (formData) => {
    try{
      console.log(formData, 'register');
      const newUser = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/users/registration`, {
        method: "POST",
        body: JSON.stringify(formData),
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        }
      })
      const parsedResponse = await newUser.json();
      // if(parsedResponse.status === 200){
        this.setState({
          loggedIn: true,
          currentUser: parsedResponse
        })
      // } 

    }catch(err){
      console.log(err);
    }
  };

  handleEditProfile = async (formData) => {
    try{
      console.log('logout');

    }catch(err){
      console.log(err); 
    }
  };

  handleLogin = async (formData) => {
    try{
      const loginUser = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/users/login`, {
        method: "POST",
        body: JSON.stringify(formData),
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        }
      })
      const parsedLoginResponse = await loginUser.json();
      console.log(parsedLoginResponse, 'login')
      // if(parsedLoginResponse.status === 200){
        this.setState({
          loggedIn: true,
          currentUser: parsedLoginResponse,
        })
      // }


    }catch(err){
      console.log(err);
    }
  };

  logout = async () => {
    this.setState({
      loggedIn: false,
      currentUser: null
    })
  };
  
  render(){
    return (
      <div className="App">
      <div className="header">
        <h4>a box of thoughts</h4>
      </div>
        <div>
          <button onClick={ this.logout }>Logout</button>
          {
            this.state.loggedIn ?
            <BoardContainer currentUser={ this.state.currentUser } />
            :
            <UserContainer handleRegister={ this.handleRegister } handleLogin={ this.handleLogin } handleEditProfile={ this.handleEditProfile } />
          }
        </div>
      </div>
    );
  }
}

export default App;
