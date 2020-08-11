import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CardDeck  from './CardDeck';

export default function Group() {
  const [ group, setGroup ] = useState(null);
  let { groupId } = useParams();

  useEffect(() => {
    (async () => {
      const res = await axios.get('/api/group', {
        params: {
          shortId: groupId
        }
      });

      setGroup(res.data);
    })()
  }, [groupId]);

  return (
    <React.Fragment>
      {!group
        ? <p>Loading...</p>
        : <CardDeck restaurants={group.businesses} groupId={groupId} />}
    </React.Fragment>
  )
}