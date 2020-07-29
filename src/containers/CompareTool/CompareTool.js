import React, {Component} from 'react';

import Form from '../../components/Form/Form';
import classes from './CompareTool.css';
import {updateObject} from '../../shared/utility';
import axios from '../../axios-instance';

class CompareTool extends Component {
  state = {
    gasURL: ['/gas_car_mpg'],
    evURL: ['/ev_car_mpv'],
    gasMPG: null,
    evMPV: null,
    formIsValid: false,
    formGas: {
      year: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'select', displayValue:'Select year'},
            {value: '2018', displayValue:'2018'},
            {value: '2019', displayValue:'2019'},
            {value: '2020', displayValue:'2020'},
          ]
        },
        validation: {},
        value: 'select',
        valid: false,
      },
      make: {
        elementType: 'select',
        elementConfig: {
          options: [{value: 'select', displayValue:'Select make'},]
        },
        validation: {},
        value: 'select',
        valid: false,
      },
      model: {
        elementType: 'select',
        elementConfig: {
          options: [{value: 'select', displayValue:'Select model'},],
        },
        validation: {},
        value: 'select',
        valid: false,
      },
    },
    formEV: {
      year: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'select', displayValue:'Select year'},
            {value: '2018', displayValue:'2018'},
            {value: '2019', displayValue:'2019'},
            {value: '2020', displayValue:'2020'},
          ]
        },
        validation: {},
        value: 'select',
        valid: false,
      },
      make: {
        elementType: 'select',
        elementConfig: {
          options: [{value: 'select', displayValue:'Select make'},]
        },
        validation: {},
        value: 'select',
        valid: false,
      },
      model: {
        elementType: 'select',
        elementConfig: {
          options: [{value: 'select', displayValue:'Select model'},],
        },
        validation: {},
        value: 'select',
        valid: false,
      }
    }
  }

  fetchSelectData = (formId, inputId, value) => {
    let url
    const shallow = '?shallow=true';
    const suffix = '.json' + shallow
    switch(formId) {
      case 'formGas':
        const gasUrl = this.state.gasURL;
        switch(inputId) {
          case 'year':
            this.setState({gasURL: [...gasUrl, value]});
            url = gasUrl.join('/') + '/' + value + suffix;
            break;
          case 'make':
            this.setState({gasURL: [...gasUrl, value]});
            url = gasUrl.join('/') + '/' + value + suffix;
            break;
          case 'model':
            this.setState({gasURL: [...gasUrl, value]});
            url = gasUrl.join('/') + '/' + value + '.json';
            break;
          default: break;
        }
        break;
      case 'formEV':
        const evUrl = this.state.evURL;
        switch(inputId) {
          case 'year':
            this.setState({evURL: [...evUrl, value]});
            url = evUrl.join('/') + '/' + value + suffix;
            break;
          case 'make':
            this.setState({evURL: [...evUrl, value]});
            url = evUrl.join('/') + '/' + value + suffix;
            break;
          case 'model':
            this.setState({evURL: [...evUrl, value]});
            url = evUrl.join('/') + '/' + value + '.json';
            break;
          default: break;
        }
        break;
      default: break;
    }

    axios.get(url)
      .then(res => {
        if (inputId === 'model') {
          switch(formId){
            case ('formGas'): this.setState({gasMPG: res.data}); break;
            case ('formEV'): this.setState({evMPV: res.data}); break;
            default: break;
          }
        } else {
          this.updateOptions(res.data, formId, inputId);
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  updateOptions = (data, formId, inputId) => {
    let nextInputId;
    switch(inputId) {
      case 'year': nextInputId = 'make'; break;
      case 'make': nextInputId = 'model'; break;
      default: break;
    }

    let fetchedOptions = Object.keys(data).map(key => {
      return {value: key, displayValue: key}
    })

    let updatedOptions = [
      ...this.state[formId][nextInputId]['elementConfig']['options'],
      ...fetchedOptions,
    ];

    const updatedFormElementConfig = updateObject(this.state[formId][nextInputId]['elementConfig'], {
      options: updatedOptions
    })
    const updatedFormElement = updateObject(this.state[formId][nextInputId], {
      elementConfig: updatedFormElementConfig,
    }) 
    const updatedForm = updateObject(this.state[formId], {
      [nextInputId]: updatedFormElement, 
    })
    this.setState({
      [formId]: updatedForm,
    })
  }

  inputChangeHandler = (event, formId, inputId, nextInputId) => {
    const updatedFormElement = updateObject(this.state[formId][inputId], {
      value: event.target.value,
    })
    const updatedForm = updateObject(this.state[formId], {
      [inputId]: updatedFormElement, 
    })
    this.setState({
      [formId]: updatedForm,
    })
    this.fetchSelectData(formId, inputId, event.target.value);
  }

  render() {
    let gasMPG = null;
    let evMPV = null;
    if(this.state.gasMPG) {
      gasMPG = (<h1>{this.state.gasMPG} MPG</h1>);
    }
    if (this.state.evMPV) {
      evMPV = (<h1>{this.state.evMPV} MPV</h1>);
    }

    return (
      <div className={classes.CompareTool}>
        <div className={classes.FormDiv}>
          <h4>Choose a gas vehicle</h4>
          <Form
            form={this.state.formGas}
            formId='formGas'
            changed={this.inputChangeHandler}/>
          {gasMPG}
        </div>
        <div className={classes.FormDiv}>
          <h4>Choose an electric vehicle</h4>
          <Form
            form={this.state.formEV}
            formId='formEV'
            changed={this.inputChangeHandler}/>
          {evMPV}
        </div>
      </div>
    )
  }
}

export default CompareTool;