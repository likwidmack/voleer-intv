import React from 'react';
import Button from './Button';
import CheckBox from './CheckBox';
import TextInput from './TextInput';
import './Form.scss';

export class Form extends React.Component {
  constructor(...data) {
    super(...data);
    this.state = {
      checked: false,
    };
  }
  render() {
    const { checked } = this.state;
    const { word = Date.now(), isDisabled, inputHandler, resetHangman } = this.props;

    return (
      <form id={`form_${word}`}>
        <TextInput
          label={'Input an Alphabetic Character'}
          defaultValue=""
          disabled={isDisabled}
          name={word}
          maxLength={1}
          textHandler={inputHandler}
        />

        <div id={`selections_${word}`}>
          <CheckBox
            label={'Keep Current Word'}
            defaultChecked={false}
            disabled={!isDisabled}
            name={word}
            onChange={e => this.updateChecked(e)}
          />

          <Button
            type={'button'}
            disabled={!isDisabled}
            name={word}
            onClick={e => resetHangman(checked)}
            text={'Reset Hangman'}
          />
        </div>
      </form>
    );
  }

  updateChecked(e) {
    this.setState({ checked: e.target.checked });
  }
}
