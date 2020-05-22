import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const cardWidth = '400px';

const CardContainer = styled.div`
  width: ${cardWidth};
  box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.2);
  border-radius: 12px 12px 0px 0px;
  border: 1px solid #dedede;
`;

const Square = styled.div`
  width: 100%;
  height: ${cardWidth};
  border-radius: inherit;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  margin: 8px 8px;  
`;

const Name = styled.h3`
  color: red;
`;

export default function Card(props) {
  const { restaurant } = props;
  const { name, rating, price, review_count: reviewCount, photos} = restaurant;

  return (
    <CardContainer>
      <Square>
        <Img src={photos[0]}/>
      </Square>
      <Info>
        <Name>{name}</Name>
        <DetailRow>
          <span>{rating} stars</span>
          <span>{price}</span>
          <span>{reviewCount} reviews</span>
        </DetailRow>
      </Info>
    </CardContainer>
  );
}

Card.propTypes = {
  restaurant: PropTypes.shape({
    name: PropTypes.string,
    rating: PropTypes.number,
    review_count: PropTypes.number,
    photos: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};