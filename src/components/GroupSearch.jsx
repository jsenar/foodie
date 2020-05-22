import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';

const Form = styled.form`
  margin: auto;
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;

  span {
    padding: 0.2em;
    border: 1px solid black;
    border-radius: 2px
  }

  input {
    border: none;
    font-size: 120%
  }

  label {
    font-size: 120%;
    font-weight: bold;
  }
`;

export function GroupSearch() {
  const [groupId, setGroupId] = useState('');
  const history = useHistory();

  const handleGroupSubmit = () => {
    // TODO: validate existence of group before redirecting
    history.push(`/groups/${groupId}`);
  }

  return (
    <Form onSubmit={handleGroupSubmit}>
      <span>
        <label htmlFor="search">Group ID: </label>
        <input 
          name="groupId"
          id="search"
          type="text"
          placeholder="Enter Group ID"
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
        />
      </span>
      <Button type="submit">Find</Button>
    </Form>
  )
}

export default GroupSearch;