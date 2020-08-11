import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const cardWidth = '300px';

const CardContainer = styled.div`
  width: ${cardWidth};
  box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.2);
  border-radius: 12px 12px 0px 0px;
  border: 1px solid #dedede;

  .square {
    width: 100%;
    height: ${cardWidth};
    border-radius: inherit;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
  }

  .info {
    margin: 8px 8px;  

    .detailRow {
      display: flex;
      justify-content: space-between;
    }

    h3 {
      color: red;
      font-size: 1rem;
      height: 3em;
    }
  }
`;

export default function Card({ restaurant, handleUpdate }) {
  const cardRef = useRef(null);
  const [startX, setStartX] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const { name, rating, price, review_count: reviewCount, photos} = restaurant;

  const handleLike = (xDiff, timeDiff) => {
    if (timeDiff > 1200 || Math.abs(xDiff) < 100) {
      return;
    }
    
    const liked = xDiff > 0;
    console.log(liked)
    handleUpdate(liked);
  }

  const handleDragStart = (event) => {
    const { timeStamp, clientX } = event;
    setStartTime(timeStamp);
    setStartX(clientX);
  };

  const handleDragEnd = (event) => {
    const { timeStamp, clientX } = event;
    
    handleLike(clientX - startX, timeStamp - startTime);
  }

  const handleTouchStart = (event) => {
    const { timeStamp } = event;
    const { clientX } = event.touches[0];
    setStartTime(timeStamp);
    setStartX(clientX);
  }

  const handleTouchEnd = (event) => {
    const { timeStamp } = event
    const { clientX } = event.changedTouches[0];

    handleLike(clientX - startX, timeStamp - startTime);
  }

  return (
    <CardContainer 
      ref={cardRef}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="square">
        <img alt={name} src={photos[0]}/>
      </div>
      <div className="info">
        <h3>{name}</h3>
        <div className="detailRow">
          <span>{rating} stars</span>
          <span>{price}</span>
          <span>{reviewCount} reviews</span>
        </div>
      </div>
    </CardContainer>
  );
}

Card.propTypes = {
  restaurant: PropTypes.shape({
    name: PropTypes.string,
    rating: PropTypes.string,
    price: PropTypes.string,
    review_count: PropTypes.number,
    photos: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};