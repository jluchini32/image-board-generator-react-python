import React from 'react';
import './App.css';
import BoardContainer from './BoardContainer/BoardContainer';
import Profile from './Profile/Profile';
import UserContainer from './UserContainer/UserContainer';

function App() {
  return (
    <div className="App">
      <div>
        <UserContainer />
      </div>
      <hr />
      <div>
        <BoardContainer />
        <Profile />
      </div>
    </div>
  );
}

export default App;
