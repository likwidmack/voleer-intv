import React from 'react';

export default function CheckBox (props) {
  const { isChecked, name } = props;
  const id = `checkbox_${name}`;
  return (
    <div className={(isChecked && 'checked') || ''}>
      <input type="checkbox"
             id={id}
             name={'_'+name}
             onChange={props.onChange} />
      {props.label && (<label htmlFor={id}>{props.label}</label>)}
    </div>
  )
}
