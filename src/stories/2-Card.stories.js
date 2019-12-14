import React from 'react';
import Card from '../components/Card';
import { data } from '../testData';

export default {
  title: 'Card',
};

export const card = () => <Card restaurant={data[2]} />;
