import React from 'react';

import classes from './Input.css';

const input = (props) => {
  let inputElement = null;
  const inputClass = classes.InputElement;

  switch(props.elementType) {
    case('select'):
      inputElement = (
        <select
          className={inputClass}
          value={props.value}>
          {props.elementConfig.options.map(option => (
            <option
              key={option.value}
              value={option.value}>
                {option.displayValue}
            </option>
          ))}
        </select>
      )
      break;
    default:
      inputElement = <input
        className={inputClass}
        {...props.elementConfig}
        value={props.value}/>;
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  )
}

export default input;