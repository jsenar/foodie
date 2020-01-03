import React from 'react';
import logo from './logo.svg';
import './App.css';
import CardDeck from './components/CardDeck';
import { data } from './testData'

function App() {
  return (
    <div className="App">
      <CardDeck restaurants={data} />
    </div>
  );
}

export default App;
