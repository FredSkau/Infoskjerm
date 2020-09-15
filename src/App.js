import React from 'react';
import logo from './logo.svg';
import './App.css';
import Title from './Title';
import DadJoke from './DadJoke';
import Scooters from './Scooters';
import Busses from './Busses';

function App() {
  console.log("Heisann");
  return (
    <div className="App">
      <Title />
      <DadJoke />
      <Scooters />
      <Busses />
    </div>
  );
}

export default App;
