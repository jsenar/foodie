import React, { useReducer } from 'react';

export const CartContext = React.createContext();

export function useCart() {
  const [cart, dispatchCart] = useReducer((state, action) => {
    switch (action.type) {
      case "CART_ADD":
        if (state.find(element => element.alias === action.business.alias)) {
          return state;
        }
        return [...state, action.business]
      case "CART_REMOVE":
        return state.filter(element => element.alias !== action.business.alias)
      default:
        throw new Error();
    }
  }, [])

  return [cart, dispatchCart];
}