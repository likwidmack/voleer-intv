import { storiesOf } from '@storybook/react';
import React from 'react';
import { Word } from './Word';

storiesOf('Word Display', module)
  .add('Empty', () => {
    const characters = Array(7).fill('');
    return <Word characters={characters} completion={false} />;
  })
  .add('Partial & Fail', () => {
    const characters = ['', 'a', '', 'g', '', 'a', ''];
    return <Word characters={characters} completion={'fail'} />;
  })
  .add('Complete & Success', () => {
    const characters = [...'hangman'];
    return <Word characters={characters} completion={'success'} />;
  });
