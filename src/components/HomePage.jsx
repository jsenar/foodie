import React from 'react';
import { useHistory } from 'react-router-dom';
import { stringify } from 'query-string';
import { useSearch } from '../hooks/useSearch';
import SearchForm from './SearchForm'

export function HomePage() {
  const history = useHistory();
  const [search, dispatch] = useSearch();
  const priceString = search.price.join(', ')


  function handleSubmit(history, e) {
    history.push({
      pathname: '/search',
      search: `?${stringify({...search, price: priceString }, { skipEmptyString: true })}`,
    });
  }

  return (
    <SearchForm search={search} dispatch={dispatch} onSubmit={(e) => handleSubmit(history, e)} />
  );
}

export default HomePage;