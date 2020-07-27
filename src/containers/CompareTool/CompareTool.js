import React, {Component} from 'react';

import Input from '../../components/UI/Input/Input';
//import {updateObject} from '../../shared/utility';

class CompareTool extends Component {
  componentDidMount() {
    console.log('<CompareTool />');
  }

  state = {
    formIsValid: false,
    formGas: {
      make: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'subaru', displayValue:'Subaru'},
            {value: 'bmw', displayValue:'BMW'},
            {value: 'audi', displayValue:'Audi'},
            {value: 'ford', displayValue:'Ford'}
          ]
        },
        validation: {},
        value: 'Select make',
        valid: false,
      },
      year: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: '2016', displayValue:'2016'},
            {value: '2017', displayValue:'2017'},
            {value: '2018', displayValue:'2018'},
            {value: '2019', displayValue:'2019'},
            {value: '2020', displayValue:'2020'},
          ]
        },
        validation: {},
        value: 'Select year',
        valid: false,
      },
      model: {
        elementType: 'select',
        elementConfig: {
          options: [],
        },
        validation: {},
        value: 'Select model',
        valid: false,
      },
    }
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.formGas) {
      formElementsArray.push({
        id: key,
        config: this.state.formGas[key]
      });
    }

    let form = (
      <form>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}/>
        ))}
      </form>
    )

    return (
      <div>
        <h4>Choose a gas vehicle</h4>
        {form}
      </div>
    )
  }
}

export default CompareTool;