import React, {Component} from 'react';

import Form from '../../components/Form/Form';
import classes from './CompareTool.css';
import {updateObject} from '../../shared/utility';

class CompareTool extends Component {
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
    },
    formEV: {
      make: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'tesla', displayValue:'Tesla'},
            {value: 'nissan', displayValue:'Nissan'},
            {value: 'vw', displayValue:'Volkswagen'},
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
      }
    }
  }

  inputChangeHandler = (event, formId, inputId) => {
    const updatedFormElement = updateObject(this.state[formId][inputId], {
      value: event.target.value,
    })
    const updatedForm = updateObject(this.state[formId], {
      [inputId]: updatedFormElement, 
    })
    this.setState({
      [formId]: updatedForm,
    })
  }

  render() {
    return (
      <div className={classes.CompareTool}>
        <div className={classes.FormDiv}>
          <h4>Choose a gas vehicle</h4>
          <Form
            form={this.state.formGas}
            formId='formGas'
            changed={this.inputChangeHandler}/>
        </div>
        <div className={classes.FormDiv}>
          <h4>Choose an electric vehicle</h4>
          <Form
            form={this.state.formEV}
            formId='formEV'
            changed={this.inputChangeHandler}/>
        </div>
      </div>
    )
  }
}

export default CompareTool;