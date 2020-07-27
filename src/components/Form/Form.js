import React from 'react';

import Input from '../UI/Input/Input';
import classes from './Form.css';

const form = (props) => {
  const formElementsArray = [];
  for (let key in props.form) {
    formElementsArray.push({
      id: key,
      config: props.form[key]
    });
  }

  return (
    <form className={classes.Form}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}/>
        ))}
    </form>
  )
}

export default form;