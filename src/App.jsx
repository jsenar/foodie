import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Group from './components/Group';
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import GroupSearch from './components/GroupSearch';

function App() {
  return (
    <div className="App">
      <h1>Foodie</h1>
      <Switch>    
        <Route path='/groups/:groupId'>
          <Group />
        </Route>
        
        <Route path='/groups'>
          <GroupSearch />
        </Route>

        <Route path='/search'>
          <SearchPage />
        </Route>

        <Route path='/'>
          <h3>Search for Restaurants and Create a Group</h3>
          <HomePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
