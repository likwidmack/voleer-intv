import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './Button';
import CheckBox from './CheckBox';
import TextInput from './TextInput';
import {Form} from './Form';

class ButtonStory extends React.Component {
  constructor(...data) {
    super(...data);
    this.state = {
      text: 'Story Button',
      timer: null
    }
  }

  render() {
    return (
      <div>
        <Button type={'button'}
                name={this.props.name}
                onClick={e => this.onClick(e)}
                text={this.state.text} />
      </div>
    );
  }

  onClick(e) {
    this.setState((state) => ({
      text: 'Button Clicked!',
      timer: setTimeout(() => {
        this.setState({
          timer: null,
          text: 'Story Button'
        });
        clearTimeout(state.timer);
      }, 2000)
    }));
  }
}

class CheckboxStory extends React.Component {
  constructor(...data) {
    super(...data);
    this.state = {
      checked: false,
      text: 'Checkbox at Zero Time'
    };
  }

  render() {
    return (
      <div>
        <CheckBox isChecked={this.state.checked}
                  name={this.props.name}
                  label={this.state.text}
                  onChange={e => this.change(e)} />
      </div>
    );
  }

  change(e) {
    const {checked} = e.target;
    this.setState({
      checked,
      text: `${checked ? 'checked' : 'unchecked'} at ${(new Date()).toLocaleTimeString()}`
    })
  }
}

class TextInputStory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Label with no character'
    };
  }

  render() {
    return (
      <div>
        <TextInput label={this.state.text}
                   maxLength={1}
                   name={this.props.name}
                   textHandler={e => this.handler(e)} />
      </div>
    )
  }

  handler(e) {
    const {value} = e.target;
    this.setState({
      text: value.length ? `Label with character ${value}` : 'Label with no character'
    })
  }
}

storiesOf('Form Components', module)
  .add('Button', () => {
    return (<ButtonStory name={'btnAwesome'} />);
  })
  .add('Checkbox', () => {
    return (<CheckboxStory name={'chkAwesome'}/>);
  })
  .add('TextInput', () => {
    return (<TextInputStory name={'txtAwesome'}/>);
  })
  .add('Form', () => {
    return (<Form word={'awesome'}
                  inputHandler={e => alert(e.target.value)}
                  resetWord={() => alert('reset WORD')}
                  resetHangman={e => alert(e.target.id)} />)
});
