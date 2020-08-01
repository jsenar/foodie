import React from 'react';
import styled from 'styled-components';

const Bar = styled.ul`
  width: 100%;
  display: flex;
  text-align: left;
  list-style-type: none;
  padding: 0 0.2rem;
  margin: 0 0 1rem 0;
  background-color: #d12c2c;
  align-items: baseline;

  .home {
    margin-left: 1rem;
    margin-right: 1rem;
  }

  li {
    font-size: 1.2rem;
    height: 100%;
    padding: 0.5rem 0;

    .selected {
      background-color: #a12222;
    }

    a {
      padding: 0.5rem;
      margin: 0;
      height: 100%;
      text-decoration: none;
      color: white;
    }
    
    &:last-child {
      position: absolute;
      right: 0;
    }
  }
`;

export function NavBar({homeLink, children}) {
  return (
    <Bar>
      {homeLink && (
        <li className="home">
          {homeLink}
        </li>
      )}

      {React.Children.toArray(children).map( child => (
        <li key={child.key}>
          {child}
        </li>
      )) }
    </Bar>
  )
}

export default NavBar;