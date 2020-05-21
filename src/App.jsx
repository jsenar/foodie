import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import CardDeck from './components/CardDeck';
import Search from './components/Search'
import { data } from './testData'

function App() {
  return (
    <div className="App">
      <h1>Foodie</h1>
      <Switch>
        <Route path='/group'>
          <CardDeck restaurants={data} />
        </Route>

        <Route path='/'>
          <Search />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
