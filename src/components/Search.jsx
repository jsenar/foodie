import React, { useReducer } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { stringify } from 'query-string';
import Button from './Button';

const Form = styled.form`
  margin: auto;

  .searchBar {
    display: flex;
    margin: auto;
    align-items: center;
    justify-content: center;

    span {
      padding-left: 0.2em;
      border: 1px solid #ababab;
    }

    input {
      padding: 0.2em;
      border: none;
      font-size: 120%;
    }

    input:focus, input:active {
      outline: none;
    }

    label {
      font-size: 120%;
      font-weight: 500;
    }

    button {

    }
  }

  .prices {
    margin: 1em auto;
  }
`;

function PriceCheckbox({value, onChange, price}) {
  return (
    <React.Fragment>
      <label htmlFor={`price${value}`}>{'$'.repeat(value)}</label>
      <input
        type="checkbox"
        name={`price${value}`}
        value={value}
        checked={price.includes(value)}
        onChange={onChange}
      />
    </React.Fragment>
  );
}

export function Search() {
  const history = useHistory();
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
    term: '',
    location: '',
    price: [],
  });
  
  const handleSearch = (history, e) => {
    console.log(e)
    const priceString = search.price.join(', ')

    history.push({
      pathname: '/search',
      search: `?${stringify({ ...search, price: priceString }, { skipEmptyString: true })}`,
    });
    
    // axios.get('/search', {
    //   term: search,
    //   location,
    //   locale,
    //   price: priceString,
    // }).then((res) => {
    //   console.log(res)
    //   setRestaurants(res.data.search.business);
    // }).catch((err) => {
    //   console.log(err);
    // });
  }

  const handlePriceChange = (event) => {
    const { value } = event.target;
    const { price } = search;

    if (price.includes(value)) {
      dispatch({ type: "CHANGE_PRICE", price: price.filter((priceItem) => priceItem !== value)});
    } else {
      dispatch({ type: "CHANGE_PRICE", price: [...price, value].sort() }); 
    }
  }

  return (
    <React.Fragment>
      <Form onSubmit={(e) => handleSearch(history, e)}>
        <div className="searchBar">
          <span>
            <label htmlFor="search">Find </label>
            <input 
              name="search"
              id="search"
              type="text"
              placeholder="Asian restaurants"
              value={search.term}
              onChange={(e) => dispatch({ type: "CHANGE_TERM", term: e.target.value })}
            />
          </span>
          {/**TODO: replace with geosuggestion component */}
          <span>
            <label htmlFor="location"> Near </label>
            <input
              name="location"
              id="location"
              type="text"
              placeholder="San Diego, CA 92122"
              value={search.location}
              onChange={(e) => dispatch({ type: "CHANGE_LOCATION", location: e.target.value })}
            />
          </span>

          <Button type="submit">Search</Button>
        </div>

        <div className="prices">
          <PriceCheckbox value="1" price={search.price} onChange={handlePriceChange} />
          <PriceCheckbox value="2" price={search.price} onChange={handlePriceChange} />
          <PriceCheckbox value="3" price={search.price} onChange={handlePriceChange} />
          <PriceCheckbox value="4" price={search.price} onChange={handlePriceChange} />
        </div>
      </Form>
    </React.Fragment>
  )
}

export default Search;