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
import { CartContext, useCart } from './lib/CartContext';

function App() {
  const [cart, dispatchCart] = useCart();

  return (
    <CartContext.Provider value={{ cart, dispatchCart }}>
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
    </CartContext.Provider>
  );
}

export default App;
