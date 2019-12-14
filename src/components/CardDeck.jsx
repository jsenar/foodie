import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Card from './Card';

export default function CardDeck(props) {
  const { restaurants } = props;
  let [currentIdx, setCurrentIdx] = useState(0);
  let restaurant = restaurants[currentIdx];

  if (restaurant) {
    return (
      <div>
        <Card restaurant={restaurant} />
        <button
          onClick={() => setCurrentIdx((idx) => idx + 1)}
          >
          Like
        </button>
      </div>
    );
  }

  return (
    <div>No More Restaurants</div>
  )
}

CardDeck.propTypes = {
  restaurants: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      rating: PropTypes.number,
      review_count: PropTypes.number,
      photos: PropTypes.arrayOf(PropTypes.string),
    }).isRequired
  ),
};