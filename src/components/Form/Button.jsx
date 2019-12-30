import React from 'react';

export default function Button(props) {
  const {name, onClick, text, type, ...attrs} = props;
  const id = `button_${type}_${name}`;
  return (
    <button id={id}
            className={'button large'}
            type={type || 'button'}
            onClick={onClick}
            {...attrs} >
      {text}
    </button>
  );
}
