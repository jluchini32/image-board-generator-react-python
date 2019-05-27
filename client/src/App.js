import React, { Component } from 'react';
import './App.css';
import BoardContainer from './BoardContainer/BoardContainer';
import UserContainer from './UserContainer/UserContainer';

class App extends Component {
  constructor(){
    super();
    this.state = {
      loggedIn: false,
      currentUser: null,
      boards: []
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
      console.log(parsedResponse, 'parsedResponse register')
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
      console.log(parsedLoginResponse, 'login')
      if(parsedLoginResponse.status === 200){
        this.setState({
          loggedIn: true,
          currentUser: parsedLoginResponse.data,
        })
      }
    }catch(err){
      console.log(err);
    }
  };
  // NOT WORKING
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
  createBoard = async (formData) => {
    const newBoard = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/boards`, {
        credentials: 'include',
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    console.log(newBoard, 'newBoard')
    const parsedResponse = await newBoard.json();
    console.log(parsedResponse, 'parsedResponse')
    if(newBoard.status === 200){
        this.setState({
            boards: [...this.state.boards, parsedResponse.data]
        })
    }
  };
  render(){
    console.log(this.state.currentUser, 'current user')
    console.log(this.state.boards, 'boards app')
    return (
      <div className="App">
      <div className="header">
        <h4>a box of thoughts</h4>
      </div>
        <div>
          {
            this.state.loggedIn ?
            <BoardContainer showBoards={ this.state.currentUser.boards } createBoard={ this.createBoard } />
            :
            <UserContainer handleRegister={ this.handleRegister } handleLogin={ this.handleLogin } handleEditProfile={ this.handleEditProfile } />
          }
        </div>
      </div>
    );
  }
}

export default App;
