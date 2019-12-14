import React from 'react';
import CardDeck from '../components/CardDeck';
import { data } from '../testData';

export default {
  title: 'CardDeck',
};

export const card = () => <CardDeck restaurants={data} />;
