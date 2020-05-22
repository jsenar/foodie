import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CardDeck  from './CardDeck';

export default function Group() {
  const [ group, setGroup ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  let { groupId } = useParams();

  useEffect(() => {
    axios.get('/api/group').then( async (res) => {
      await setGroup(res.data);
      setLoading(false);
    }).catch((err) => {
      setLoading(false);
      console.log(err);
    });
  }, [groupId] );

  return (
    <React.Fragment>
      {loading
        ? <p>Loading...</p>
        : <CardDeck restaurants={group} />}
    </React.Fragment>
  )
}