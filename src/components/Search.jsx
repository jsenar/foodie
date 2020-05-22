import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
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

function PriceCheckbox({value, onChange, prices}) {
  return (
    <React.Fragment>
      <label htmlFor={`price${value}`}>{'$'.repeat(value)}</label>
      <input
        type="checkbox"
        name={`price${value}`}
        value={value}
        checked={prices.includes(value)}
        onChange={onChange}
      />
    </React.Fragment>
  );
}

export function Search() {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [prices, setPrices] = useState([]);
  
  const handleSearch = (e) => {
    e.preventDefault();
    const priceString = prices.join(', ')
    console.log(search, priceString, location)
    const locale = 'en_US';
    
    axios.post('/api/search', {
      term: search,
      location,
      locale
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err);
    });
  }

  const handlePriceChange = (event) => {
    const { value } = event.target;
    setPrices(prices => {
      if (prices.includes(value)) {
        return prices.filter((price) => price !== value);
      } else {
        return [...prices, value].sort()
      }
    })
  }

  return (
    <Form onSubmit={handleSearch}>
      <div className="searchBar">
        <span>
          <label htmlFor="search">Find </label>
          <input 
            name="search"
            id="search"
            type="text"
            placeholder="Asian restaurants"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </span>

        <Button type="submit">Search</Button>
      </div>

      <div className="prices">
        <PriceCheckbox value="1" prices={prices} onChange={handlePriceChange} />
        <PriceCheckbox value="2" prices={prices} onChange={handlePriceChange} />
        <PriceCheckbox value="3" prices={prices} onChange={handlePriceChange} />
        <PriceCheckbox value="4" prices={prices} onChange={handlePriceChange} />
      </div>
    </Form>
  )
}

export default Search;