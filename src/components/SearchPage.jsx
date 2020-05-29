import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
import { parse, stringify } from 'query-string';
import { useSearch } from '../hooks/useSearch';
import Button from './Button';
import SearchForm from './SearchForm';
import { CartContext } from '../lib/CartContext';

const ListItem = styled.li`
  text-align: left;
  border: 1px solid #dfdfdf;
  border-radius: 3px;
  display: flex;
  padding: 0.4em;
  margin: 0.4em auto;
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: 650px) {
    font-size: 80%;
  }

  img {
    height: 8em;
    width: 8em;
    margin-right: 1em;
    object-fit: cover;
  }

  .leftContent {
    display: flex;

    .name {
      max-width: 15em;

      @media only screen and (max-width: 650px) {
        max-width: 10em;
      }
    }
  }

  .rightContent {
    font-size: 0.8em;
    line-height: 1em;
    margin-right: 1em;
    max-width: 20em;
  }
`;

export function SearchPage() {
  const history = useHistory();
  const location = useLocation();    
  const { cart, dispatchCart } = useContext(CartContext);
  const { price, ...init } = parse(location.search);
  
  const [ searchState, dispatchSearch ] = useSearch(
    { ...init, price: (price && price.split(', '))}
  );

  const [ businesses, setBusinesses ] = useState([]);
  const locale = 'en_US';
  
  useEffect(() => {
    let isCurrent = true;

    if (location.search) {
      axios.post('/api/search', { ...parse(location.search), locale }).then((res) => {
        if (isCurrent) {
          setBusinesses(res.data.search.business);
        }
      }).catch((err) => {
        console.log(err);
      });
    }

    return (() => { 
      isCurrent = false;
    })
  }, [location]);

  function handleSubmit(e) {
    e.preventDefault();
    const priceString = searchState.price.join(', ')

    history.replace({
      search: `?${stringify({...searchState, price: priceString }, { skipEmptyString: true })}`,
    });
  }

  return (
    <React.Fragment>
      <SearchForm search={searchState} dispatch={dispatchSearch} onSubmit={handleSubmit}/>
      <ul style={{ 'listStyleType': 'none', 'padding': '0' }}>
        {businesses.map((business) => (
          <ListItem key={business.alias}>
            <div className='leftContent'>
              <img alt={business.name} src={business.photos[0]} />
              <div className='name'>
                <h3>{business.name}</h3>
                <p>{business.price}</p>
              </div>
            </div>
            <div className='rightContent'>
              <p>{business.rating} stars </p>
              <p>{business.review_count} reviews</p>
              <p><a target="_blank" rel="noopener noreferrer" href={business.url}>View on Yelp</a></p>
              <Button 
                disabled={cart.find(item => item.alias === business.alias)}
                onClick={() => {
                  dispatchCart({type: "CART_ADD", business})
                }}
              >
                Add
              </Button>
            </div>
          </ListItem>
        ))}
      </ul>
    </React.Fragment>
  );
}

export default SearchPage