import React from 'react';
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
      padding: 0.2em;
      border: 1px solid black;
      border-radius: 2px
    }

    input {
      border: none;
      font-size: 120%
    }

    label {
      font-size: 120%;
      font-weight: bold;
    }
  }

  .prices {
    margin: 1em auto;
  }
`;

export function Search() {
  return (
    <Form>
      <div className="searchBar">
        <span>
          <label for="search">Find: </label>
          <input id="search" type="text" placeholder="Asian restaurants"/>
        </span>
        {/**TODO: replace with geosuggestion component */}
        <span>
          <label for="location"> Near: </label>
          <input id="location" type="text" placeholder="San Diego, CA 92122"/>
        </span>

        <Button type="submit">Search</Button>
      </div>

      <div className="prices">
        <label for="price1"> $</label>
        <input type="checkbox" name="price1" value="1"/>
        <label for="price2"> $$</label>
        <input type="checkbox" name="price2" value="2"/>
        <label for="price3"> $$$</label>
        <input type="checkbox" name="price3" value="3"/>
        <label for="price3"> $$$$</label>
        <input type="checkbox" name="price4" value="4"/>
      </div>
    </Form>
  )
}

export default Search;