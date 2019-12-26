import React from 'react';

export function Letter(props) {
  return (
    <div className={'letter-block'}>
      <span>{props.letter}</span>
    </div>
  )
}
