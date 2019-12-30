import React from 'react';

export default function CheckBox (props) {
  const { defaultChecked = false, isChecked, label, name, onChange, ...attrs } = props;
  const id = `checkbox_${name}`;
  return (
    <div className={(isChecked ? 'checked' : '')}>
      <input type="checkbox"
             id={id}
             name={'_'+name}
             defaultChecked={defaultChecked}
             onChange={onChange}
             {...attrs} />
             {label && (<label htmlFor={id}>{label}</label>)}
    </div>
  )
}
