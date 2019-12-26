import React from 'react';
import Button from './Button';
import CheckBox from './CheckBox';
import TextInput from './TextInput';
import './Form.scss';

export class Form extends React.Component {
  render() {
    const {
      word = Date.now(),
      inputHandler,
      resetHangman,
      resetWord
    } = this.props;

    return (
      <form id={`form_${word}`}>
        <TextInput label={'Input an Alphabetic Character'}
                   maxLength={1}
                   name={word}
                   textHandler={inputHandler} />

        <div id={`selections_${word}`}>
          <CheckBox label={'Reset with new Word'}
                    name={word}
                    onChange={e => resetWord(e.target.checked)} />

          <Button type={'button'}
                  name={word}
                  onClick={resetHangman}
                  text={'Reset Hangman'} />
        </div>
      </form>
    );
  }
}
