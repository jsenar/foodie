import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from './Card';
import Button from './Button';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const Row = styled.div`
  display: flex;
  margin-top: 1.5em;
  justify-content: space-between;
`;

const Deck = styled.div`
  position: relative;
  margin: auto;
  width: 300px;
`;

function ButtonRow({ setCurrentIdx, setLiked, handleUpdate }) {
  return (
    <Row>
      <Button
        mode="tertiary"
        onClick={async () => {
          handleUpdate(false);
        }}
        >
        Dislike
      </Button>
      <Button
        onClick={async () => {
        handleUpdate(true);
      }}
        >
        Like
      </Button>
    </Row>
  );
}

export default function CardDeck(props) {
  const { restaurants, groupId } = props;
  let [currentIdx, setCurrentIdx] = useState(0);
  let [liked, setLiked] = useState(false);
  let restaurant = restaurants && restaurants[currentIdx];

  const handleUpdate = async (liked) => {
    const increment = liked ? "LIKED" : "DISLIKED";
    const res = await axios.post('/api/group/update', {
      params: {
        shortId: groupId,
        alias: restaurant.alias,
        increment
      }
    });
    setLiked(liked);
    setCurrentIdx((idx) => idx + 1);
  }

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
            <Card restaurant={restaurant} liked={liked} handleUpdate={handleUpdate}/> :
            <p>No more restaurants</p>
          }
        </CSSTransition>
      </TransitionGroup>

      { 
        restaurant ?
        <ButtonRow setCurrentIdx={setCurrentIdx} setLiked={setLiked} handleUpdate={handleUpdate}/> :
        null 
      }
    </Deck>
  );
}

CardDeck.propTypes = {
  restaurants: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      rating: PropTypes.string,
      review_count: PropTypes.number,
      photos: PropTypes.arrayOf(PropTypes.string),
    }).isRequired
  ),
};
