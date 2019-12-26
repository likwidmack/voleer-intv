import React from 'react';
import {Letter} from './Letter';
import './Display.scss';

export function Word(props) {
  const { characters, completion } = props;
  const Letters = characters.map((character, i) =>
    <Letter key={i} letter={character} />
  );

  return (
    <div className={['word-display', completion].join(' ')}>
      <div className={'word'}>{Letters}</div>
    </div>
  );
}
