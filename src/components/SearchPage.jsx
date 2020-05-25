import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { parse } from 'query-string';
import Button from './Button';

const ListItem = styled.li`
  text-align: left;
  border: 1px solid #dfdfdf;
  border-radius: 3px;
  display: flex;
  padding: 0.4em;
  margin: 0.4em auto;
  justify-content: space-between;
  align-items: center;

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
    }
  }

  .rightContent {
    font-size: 0.8em;
    line-height: 1em;
    margin-right: 2em;
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
  const { search } = useLocation();    
  const [ businesses, setBusinesses ] = useState([]);
  const locale = 'en_US';
  
  useEffect(() => {
    const parsedSearch = parse(search);
    const isCurrent = true;

    axios.post('/api/search', parsedSearch).then((res) => {
      console.log(res)
      if (isCurrent) {
        setBusinesses(res.data.search.business);
      }
    }).catch((err) => {
      console.log(err);
    });

    return (() => { 
      isCurrent = false;
    })
  }, [search]);

  return (
    <ul style={{ 'list-style-type': 'none' }}>
      {businesses.map((business) => (
        <Business key={business.alias} business={business} />
      ))}
    </ul>
  );
}

export default SearchPage