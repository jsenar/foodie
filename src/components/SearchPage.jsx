import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
import { parse, stringify } from 'query-string';
import { useSearch } from '../hooks/useSearch';
import Button from './Button';
import SearchForm from './SearchForm';

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

function Business({business}) { 
  let {name, photos, rating, review_count, url, price} = business;

  return (
    <ListItem>
      <div className='leftContent'>
        <img alt={name} src={photos[0]} />
        <div className='name'>
          <h3>{name}</h3>
          <p>{price}</p>
        </div>
      </div>
      <div className='rightContent'>
        <p>{rating} stars </p>
        <p>{review_count} reviews</p>
        <p><a target="_blank" rel="noopener noreferrer" href={url}>View on Yelp</a></p>
        <Button>Add</Button>
      </div>
    </ListItem>
  )
}

export function SearchPage() {
  const history = useHistory();
  const location = useLocation();    
  const { price, ...init } = parse(location.search);
  
  const [ searchState, dispatch ] = useSearch(
    { ...init, price: (price && price.split(', '))}
  );

  const [ businesses, setBusinesses ] = useState([]);
  const locale = 'en_US';
  
  useEffect(() => {
    let isCurrent = true;

    axios.post('/api/search', { ...parse(location.search), locale }).then((res) => {
      if (isCurrent) {
        setBusinesses(res.data.search.business);
      }
    }).catch((err) => {
      console.log(err);
    });

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
      <SearchForm search={searchState} dispatch={dispatch} onSubmit={handleSubmit}/>
      <ul style={{ 'listStyleType': 'none', 'padding': '0' }}>
        {businesses.map((business) => (
          <Business key={business.alias} business={business} />
        ))}
      </ul>
    </React.Fragment>
  );
}

export default SearchPage