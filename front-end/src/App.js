import React, { Component } from 'react';
import './App.css';
import BoardContainer from './BoardContainer/BoardContainer';
import Profile from './Profile/Profile';
import UserContainer from './UserContainer/UserContainer';

class App extends Component {
  constructor(){
    super();
    this.state = {
      loggedIn: false,
      currentUser: null
    }
  }
  handleRegister = async (formData) => {
    try{
      console.log(formData, 'register');
      const newUser = await fetch("http://localhost:9000/users", {
        method: "POST",
        body: JSON.stringify(formData),
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        }
      })
      const parsedResponse = await newUser.json();
      if(parsedResponse.status === 200){
        this.setState({
          loggedIn: true,
          currentUser: parsedResponse.data
        })
      } 

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
  }
  handleLogin = async (formData) => {
    console.log(formData, 'login');
    try{
      const loginUser = await fetch('http://localhost:9000/users/login', {
        method: "POST",
        body: JSON.stringify(formData),
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        }
      })
      const parsedLoginResponse = await loginUser.json();
      console.log(parsedLoginResponse);
      if(parsedLoginResponse.status === 200){
        this.setState({
          loggedIn: true,
          currentUser: parsedLoginResponse.data
        })
      }

    }catch(err){
      console.log(err);
    }

  };
  logout = async () => {
    console.log('logout');
    try{
      const logoutUser = await fetch('http://localhost:9000/users/logout', {
        method: "GET",
        credentials: 'include'
      });
      if(logoutUser.status === 200){
        this.setState({
          loggedIn: false,
          currentUser: null
        })
      }
    }catch(err){
      console.log(err);
    }

  };
  render(){
    // console.log(this.state, 'this.state app.js')
    return (
      <div className="App">
      <nav>
        <button onClick={() =>  this.logout } type="submit">Logout</button>
      </nav>
        <div>
          <UserContainer handleRegister={ this.handleRegister } handleLogin={ this.handleLogin } />
        </div>
        <hr />
          <Profile handleRegister={ this.handleRegister } />
        <hr />
        <div>
          <BoardContainer />
        </div>
      </div>
    );
  }
}

export default App;
