import React from 'react';
import { Form } from '../Form';
import { Hangman } from '../Hangman';
// import { rword } from 'rword';
import { Word } from '../Display';
import './Container.scss';

export function Container(props) {
  let o = {},
    history = {};

  class Container extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        attempts: 0,
        character: false,
        completion: false,
        letterArray: [],
        reset: true,
        word: false
      };

      this.resetWord = (reset = false) => {
        console.log('resetWord', this);
        this.setState({ reset });
      }
    }

    render() {
      return (
        <div className="container">
          <h1>React Hangman</h1>
          <Form word={this.state.word}
                inputHandler={e => this.inputHandler(e)}
                resetWord={this.resetWord}
                resetHangman={this.set} />

          <Hangman incorrectGuessCount={this.state.attempts} />

          <Word characters={this.state.letterArray}
                completion={this.state.completion} />
        </div>
      );
    }

    get currentLetter() {
      return this.state.character;
    }

    set currentLetter(character) {
      character = character || false;
      this.setState({ character });

      const letter = o[this.state.character];

      if (history[letter]) return;
      history[letter] = 1;

      if (letter){
        letter.done = true;
        const { letterArray } = this.state;
        let indices = letter.i.split(',');
        while (indices.length) letterArray[+indices.pop()] = letter;
        this.setState({ letterArray });
      } else {
        this.update(1);
      }
      this.verify();
    }

    get store() {
      return o;
    }

    set store(word) {
      if (word === this.state.word) return;
      history = {};
      o = {};

      if (!this.state.word) return;
      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        if (!o[char]) o[char] = {
          i: `${i}`,
          done: false
        };
        else o[char].i += `,${i}`;
      }
    }

    inputHandler(event) {
      const character = event.target.value || "";
      if (!character.length) return;

      this.currentLetter = character.toLowerCase();
      event.target.value = "";
      event.target.focus();
    }

    set() {
      if (!this.state.word || this.state.reset) {
        const reset = false, word = 'hangman'; // rword.generate();
        this.setState({ word, reset });
        this.store = word;
      }
      this.setState({
        attempts: 0,
        completion: false,
        letterArray: Array(this.state.word.length).fill('')
      });
    }

    stop(completion = false) {
      this.setState({
        completion,
        attempts: 0
      });
    }

    update(interval = 0) {
      let { attempts, completion } = this.state;
      attempts += interval;

      if (isNaN(attempts) || attempts > 10) attempts = 10;
      if (attempts >= 10) completion = 'fail';

      this.setState({
        attempts,
        completion
      });
    }

    verify() {
      let { state: { attempts }, store } = this;
      if (attempts < 10) {
        if (Object.values(store).every(v => v.done)){
          this.stop('success');
        }
      } else {
        this.stop('fail');
      }
    }
  }

  return (<Container {...props} />);
}
