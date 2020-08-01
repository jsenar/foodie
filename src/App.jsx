import React from 'react';
import {
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import './App.css';
import Group from './components/Group';
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import GroupSearch from './components/GroupSearch';
import CartPage from './components/CartPage';
import NavBar from './components/NavBar';
import { CartContext, useCart } from './lib/CartContext';

function App() {
  const [cart, dispatchCart] = useCart();

  return (
    <CartContext.Provider value={{ cart, dispatchCart }}>
      <NavBar homeLink={(<NavLink to='/'>Foodie</NavLink>)}>
        <NavLink to='/search' activeClassName="selected">Search</NavLink>
        <NavLink to='/groups' activeClassName="selected">Groups</NavLink>
        <NavLink to='/saved' activeClassName="selected">Saved</NavLink>
      </NavBar>
      <div className="App">
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

          <Route path='/saved'>
            <CartPage />
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
