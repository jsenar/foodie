import React from 'react';
import styled from 'styled-components';

const ButtonStyle = styled.button`
  background: none;
  background-color: ${props => props.disabled ? '#bcbcbc' : props.bgColor};
	color: ${props => props.textColor};
  border: 1px solid ${props => props.disabled ? '#bcbcbc' : props.borderColor};
  border-radius: 4px;
	padding: 0.5em 1em;
	font: inherit;
	cursor: ${props => props.disabled ? 'normal' : 'pointer'};
	outline: inherit;
`;

function getColors(mode) {
  switch (mode) {
    case 'secondary': //transparent
      return { bgColor: 'transparent', borderColor: '#3d9eff', textColor: '#3d9eff' };
    case 'tertiary': //red
      return { bgColor: '#f27278', borderColor: '#f27278', textColor: 'white' };
    case 'primary': //blue
    default:
      return { bgColor: '#3d9eff', borderColor: '#3d9eff', textColor: 'white' };
  }
}

export function Button(props) {
  const { bgColor, borderColor, textColor} = getColors(props.mode);
  return (
    <ButtonStyle 
      {...props}
      bgColor={bgColor}
      borderColor={borderColor}
      textColor={textColor}
    >
      {props.children}
    </ButtonStyle>
  );
}

export default Button;