import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from './Card';

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Deck = styled.div`
  position: relative;
  margin: auto;
  width: 400px;
`;

export default function CardDeck(props) {
  const { restaurants, size } = props;
  let [currentIdx, setCurrentIdx] = useState(0);
  let restaurant = restaurants[currentIdx];

  if (restaurant) {
    return (
      <Deck>
        <Card restaurant={restaurant} />
        
        <ButtonRow>
          <button
            onClick={() => setCurrentIdx((idx) => idx + 1)}
            >
            Dislike
          </button>
          <button
            onClick={() => setCurrentIdx((idx) => idx + 1)}
            >
            Like
          </button>
        </ButtonRow>
      </Deck>
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
