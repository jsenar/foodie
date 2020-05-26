import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const Form = styled.form`
  margin: auto;
  text-align: inherit;
  font-size: inherit;

  .searchBar {
    display: flex;
    flex-wrap: wrap;
    margin: auto;
    align-items: center;
    justify-content: center;

    @media only screen and (max-width: 650px) {
      flex-direction: column;
      height: 7em;
      justify-content: space-between;
    }

    span {
      display: flex;
      align-items: center;
      padding-left: 0.2em;
      border: 1px solid #ababab;
      border-radius: 3px;
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

export function SearchForm({ search, dispatch, onSubmit }) {  
  const { term, location, price } = search;
  const handlePriceChange = (event) => {
    const { value } = event.target;

    if (price.includes(value)) {
      dispatch({ type: "CHANGE_PRICE", price: price.filter((priceItem) => priceItem !== value) });
    } else {
      dispatch({ type: "CHANGE_PRICE", price: [...price, value].sort() }); 
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      <div className="searchBar">
        <span>
          <label htmlFor="search">Find </label>
          <input 
            name="search"
            id="search"
            type="text"
            placeholder="Asian restaurants"
            value={term}
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
            value={location}
            onChange={(e) => dispatch({ type: "CHANGE_LOCATION", location: e.target.value })}
          />
        </span>

        <Button type="submit">Search</Button>
      </div>

      <div className="prices">
        <PriceCheckbox value="1" price={price} onChange={handlePriceChange} />
        <PriceCheckbox value="2" price={price} onChange={handlePriceChange} />
        <PriceCheckbox value="3" price={price} onChange={handlePriceChange} />
        <PriceCheckbox value="4" price={price} onChange={handlePriceChange} />
      </div>
    </Form>
  )
}

export default SearchForm;