import React from 'react';

export default function Button(props) {
  const id = `button_${props.type}_${props.name}`;
  return (
    <button id={id}
            className={'button'}
            type={props.type || 'button'}
            onClick={props.onClick}>
      {props.text}
    </button>
  );
}
