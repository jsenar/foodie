import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Group from './components/Group';
import Search from './components/Search';
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

        <Route path='/'>
          <Search />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
