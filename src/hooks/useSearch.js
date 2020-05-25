import { useReducer } from 'react';

export function useSearch(defaultValue = {}) {
  const [search, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "CHANGE_TERM":
        return {...state, term: action.term}
      case "CHANGE_LOCATION":
        return {...state, location: action.location}
      case "CHANGE_PRICE":
        return {...state, price: action.price}
      default:
        throw new Error();
    }
  }, {
    term: defaultValue.term || '',
    location: defaultValue.location || '',
    price: defaultValue.price || [],
  });

  return [search, dispatch];
}