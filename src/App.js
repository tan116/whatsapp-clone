import React from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './Board.js'

function App() {
  return (
    <div className="App">
      <div className="BackgroundContainer">
        <div className="BackgroundHeader"></div>
        <div className="BackgroundBody"></div>
      </div>
      <div className="MainContainer">
        <Board />
      </div>
    </div>
  );
}

export default App;
