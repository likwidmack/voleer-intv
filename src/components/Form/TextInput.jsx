import React from 'react';

export default function TextInput (props) {
  const { label, name, textHandler, ...attrs } = props;
  const id = `textInput_${name}`;
  return (
    <div className={`text-input`}>
      <label htmlFor={id}>
        {label}
        <input id={id}
               type="text"
               onKeyUp={textHandler}
               {...attrs} />
      </label>
    </div>
  )
}
