import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from './Button';
import { CartContext } from '../lib/CartContext';
import axios from 'axios';

export default function CartPage() {
  const [shortId, setShortId] = useState('');
  const { cart } = useContext(CartContext);
  const history = useHistory();

  useEffect(() => {
    if (shortId) {
      setTimeout(() => {
        history.push(`/group/${shortId}`);
      }, 2000)
    }
  })

  const handleCreate = async () => {
    const res = await axios.post('/api/group', {
      params: {
        businesses: cart,
      }
    });

    setShortId(res.shortId);
  }

  if (!cart || cart.length < 1) {
    return <p>No Restaurants Saved</p>
  }

  return (
    <div>
      <ul>
        { cart.map(({ name, alias }) => (
            <li key={alias}>{name}</li>
        ))}
      </ul>
      <Button onClick={handleCreate}>Create Group</Button>
      { shortId && <p>Group successfully created with id: {shortId}</p>}
    </div>
  );
}