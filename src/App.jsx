import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Group from './components/Group';
import Search from './components/Search'

function App() {
  return (
    <div className="App">
      <h1>Foodie</h1>
      <Switch>
        <Route path='/groups/:groupId'>
          <Group />
        </Route>

        <Route path='/'>
          <Search />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
