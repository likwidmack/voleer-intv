import React from 'react';
import { Form } from '../Form';
import { Hangman } from '../Hangman';
import { Word } from '../Display';
import './Container.scss';

const count = 1;
const getWordUrl = `https://tmack-api-staging.herokuapp.com/api/random/words/${count}?length=5-15`;

export function Container(props) {
  let o = {},
    history = new Set();

  class Container extends React.Component {
    letterArray = [];
    completion = false;
    attempts = 0;

    constructor(...data) {
      super(...data);
      this.state = {
        character: false,
        disabled: false,
        word: false,
      };
    }

    componentDidMount() {
      this.updateWord();
    }

    render() {
      let { character, disabled, word } = this.state;
      let { attempts, completion, letterArray } = this;

      return (
        <div className="grid-y medium-grid-frame container-wrapper">
          <div className="cell shrink header medium-cell-block-container">
            <div className="grid-x grid-padding-x">
              <div id="header-alerts" className={`cell auto ${completion ? '' : completion}`}>
                <h1>React Hangman</h1>
              </div>
              <div className="cell shrink header-bar">
                <div className="grid-x grid-margin-x align-middle">
                  <div className={`cell shrink ${(character && 'callout primary') || ''}`}>
                    <h2>{character}</h2>
                  </div>
                  <div className="cell auto callout">
                    <p>Attempts remaining</p>
                    <div className="stat">{10 - attempts}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cell medium-auto medium-cell-block-container">
            <div className="grid-x grid-padding-x">
              <div className="cell medium-4 medium-cell-block-y">
                <Form
                  word={word}
                  isDisabled={disabled}
                  inputHandler={e => this.updateCharacter(e)}
                  resetHangman={bool => this.updateWord(bool)}
                />
                <div>
                  {completion === 'fail' ? (
                    <div className="callout alert hangman-results">
                      <h4>Correct Answer</h4>
                      <span>{word}</span>
                    </div>
                  ) : null}
                  {completion === 'success' ? (
                    <div className="callout success hangman-results">
                      <h4>Correct! Congratulations!</h4>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="cell medium-8 medium-cell-block-y">
                <div className={`hangman-container callout ${completion ? completion : ''}`}>
                  <Word characters={letterArray} completion={completion} />
                  <Hangman incorrectGuessCount={attempts} />
                  <Word characters={letterArray} completion={completion} />
                </div>
              </div>
            </div>
          </div>
          <div className="cell shrink footer">
            <div className="grid-x grid-padding-x">
              <div className="cell shrink">
                <h4 className="subheader">Characters Used</h4>
              </div>
              <div className="cell auto">
                <p className="callout secondary">{[...history].sort().join(' ')}</p>
              </div>
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

      const letter = o[character];
      console.log('currentLetter', character, letter, o);

      if (history.has(character)) {
        console.warn('Already Tried this Letter');
        return;
      }
      history.add(character);

      if (letter) {
        letter.done = true;
        let indices = letter.i.split(',');
        while (indices.length) this.letterArray[+indices.pop()] = character;
      } else {
        this.attempts += 1;
        if (isNaN(this.attempts) || this.attempts > 10) this.attempts = 10;
      }

      this.updateCompletion();
      this.setState({ character });
    }

    get store() {
      return Object.assign({}, o);
    }

    set store(word) {
      o = {};
      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        if (!o[char])
          o[char] = {
            i: `${i}`,
            done: false,
          };
        else o[char].i += `,${i}`;
      }
    }

    reset(word) {
      history = new Set();
      this.store = word;
      this.letterArray = Array(word.length)
        .fill(null)
        .map(v => '');
      this.completion = false;
      this.attempts = 0;
      this.setState({ character: false });
    }

    updateCharacter(event) {
      const { target } = event;
      const character = target.value || '';
      if (!character.length) return;
      if (!this.letterArray.length) {
        console.warn('Please set hangman to play.');
        return;
      }

      this.currentLetter = character.toLowerCase();
      target.value = '';
      if (!this.completion || !this.state.disabled) target.focus();
      else target.blur();
    }

    updateCompletion() {
      let { disabled } = this.state;

      disabled = true;
      if (this.attempts < 10 && Object.values(o).every(v => v.done)) {
        this.completion = 'success';
      } else if (this.attempts >= 10) {
        this.completion = 'fail';
      } else {
        disabled = false;
      }
      this.setState({ disabled });
    }

    updateWord(useCurrentWord = false) {
      this.setState({
        disabled: true,
      });

      if (useCurrentWord) {
        const { word } = this.state;
        this.reset(word);
        this.setState({ disabled: false });
        return;
      }

      fetch(getWordUrl)
        .then(res => res.json())
        .then(data => {
          const {
            words: [word],
          } = data;
          this.reset(word);
          this.setState({
            disabled: false,
            word,
          });
        })
        .catch(err => {
          console.error(err);
          this.setState({ disabled: false });
        });
    }
  }

  return <Container {...props} />;
}
