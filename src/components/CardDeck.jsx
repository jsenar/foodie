import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from './Card';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const Row = styled.div`
  display: flex;
  margin-top: 8px;
  justify-content: space-between;
`;

const Deck = styled.div`
  position: relative;
  margin: auto;
  width: 400px;
`;

const Button = styled.button`
  height: 50px;
  background: none;
  background-color: ${props => props.isLike ? '#3d9eff' : '#f27278'};
	color: white;
  border: 1px solid;
  border-radius: 4px;
	padding: 8px 16px;
	font: inherit;
	cursor: pointer;
	outline: inherit;
`;

function ButtonRow({ setCurrentIdx, setLiked, setDisliked }) {
  return (
    <Row>
      <Button
        isLike={false}
        onClick={async () => {
          await setDisliked(true);
          await setLiked(false);
          setCurrentIdx((idx) => idx + 1);
        }}
        >
        Dislike
      </Button>
      <Button
        isLike={true}
        onClick={async () => {
        await setLiked(true);
        await setDisliked(false);
        setCurrentIdx((idx) => idx + 1);
      }}
        >
        Like
      </Button>
    </Row>
  );
}

export default function CardDeck(props) {
  const { restaurants, size } = props;
  let [currentIdx, setCurrentIdx] = useState(0);
  let [liked, setLiked] = useState(false);
  let [disliked, setDisliked] = useState(false);
  let restaurant = restaurants[currentIdx];

  return (
    <Deck>
      <TransitionGroup>
        <CSSTransition
          key={restaurant ? restaurant.alias : 'empty'}
          timeout={500}
          classNames={`card ${liked ? 'card-right' : 'card-left'}`}
        >
          { 
            restaurant ? 
            <Card restaurant={restaurant} liked={liked} disliked={disliked}/> :
            <p>No more restaurants</p>
          }
        </CSSTransition>
      </TransitionGroup>

      { 
        restaurant ?
        <ButtonRow setCurrentIdx={setCurrentIdx} setLiked={setLiked} setDisliked={setDisliked}/> :
        null 
      }
    </Deck>
  );
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
