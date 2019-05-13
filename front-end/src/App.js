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
  };
  handleLogin = async () => {
    console.log('login')
  };
  render(){
    console.log(this.state, 'this.state app.js')
    return (
      <div className="App">
        <div>
          <UserContainer handleRegister={ this.handleRegister } handleLogin={ this.handleLogin } />
        </div>
        <hr />
        <div>
          <BoardContainer />
          <Profile />
        </div>
      </div>
    );
  }
}

export default App;
