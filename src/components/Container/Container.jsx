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
    }

    render() {
      let { attempts, completion, character, letterArray, word } = this.state;

      return (
        <div className="grid-y medium-grid-frame">
          <div className='cell shrink header medium-cell-block-container'>
            <div className="grid-x grid-padding-x">
              <div id='header-alerts' className={`cell auto ${completion ? '' : completion}`}>
                <h1>React Hangman</h1>
              </div>
              <div className='cell shrink'>
                <article>Alerts
                  <div className='grid-x grid-margin-x'>
                    <div className='cell auto'>{attempts}</div>
                    <div className='cell auto'>{character}</div>
                  </div>
                </article>
              </div>
            </div>
          </div>
          <div className='cell medium-auto medium-cell-block-container'>
            <div className='grid-x grid-padding-x'>
              <div className='cell medium-4 medium-cell-block-y'>
                <Form word={word}
                      inputHandler={e => this.inputHandler(e)}
                      resetWord={v => this.resetWord(v)}
                      resetHangman={e => this.set(e)} />
                <div>
                  {completion && completion === 'fail' ? (<div className='callout alert'>
                    <h4>Answer:</h4>
                    <span>{word}</span>
                  </div>) : null}
                </div>
              </div>
              <div className='cell medium-8 medium-cell-block-y'>
                <div className='hangman-container callout'>
                  <Hangman incorrectGuessCount={attempts} />
                  <Word characters={letterArray}
                        completion={completion} />
                </div>
              </div>
            </div>
          </div>
          <div className='cell shrink footer'>
            <div>
              Events & Info
              <p>{Object.keys(history)}</p>
            </div>
          </div>
        </div>
      );
    }

    get currentLetter() {
      return this.state.character;
    }

    set currentLetter(character) {
      character = character || false;
      this.setState({ character });

      const letter = o[character];
      console.log('currentLetter', character, letter, o);

      if (history[character]) {
        console.warn('Already Tried this Letter');
        return;
      }
      history[character] = 1;

      if (letter){
        letter.done = true;
        const { letterArray } = this.state;
        let indices = letter.i.split(',');
        while (indices.length) letterArray[+indices.pop()] = character;
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
      if (!this.state.letterArray.length) {
        console.warn('Please set hangman to play.');
        return;
      }

      this.currentLetter = character.toLowerCase();
      event.target.value = "";
      event.target.focus();
    }

    resetWord(reset = false) {
      this.setState({ reset });
    }

    set() {
      let word = this.state.word;
      if (!(word && word.length) || this.state.reset) {
        const reset = false;
        word = 'hangman'; // rword.generate();
        this.store = word;
        this.setState({ word, reset });
      }
      this.setState({
        attempts: 0,
        completion: false,
        letterArray: Array(word.length).fill(null).map(v => '')
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
