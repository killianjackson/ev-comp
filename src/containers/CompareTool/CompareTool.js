import React, {Component} from 'react';

import Form from '../../components/Form/Form';
import classes from './CompareTool.css';
import {updateObject} from '../../shared/utility';
import axios from '../../axios-instance';
import Data from '../../components/Data/Data';
import Chart from '../../components/UI/Chart/Chart';
import Aux from '../../hoc/Aux/Aux';

class CompareTool extends Component {
  state = {
    gasURL: ['/gas_car_mpg'],
    evURL: ['/ev_car_mpv'],
    gasMPG: null,
    evkWh: null,
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
        let gasUrl = this.state.gasURL;
        switch(inputId) {
          case 'year':
            gasUrl = gasUrl.slice(0,1);
            this.setState({gasURL: [...gasUrl, value]});
            url = gasUrl.join('/') + '/' + value + suffix;
            break;
          case 'make':
            gasUrl = gasUrl.slice(0,2);
            this.setState({gasURL: [...gasUrl, value]});
            url = gasUrl.join('/') + '/' + value + suffix;
            break;
          case 'model':
            gasUrl = gasUrl.slice(0,3);
            this.setState({gasURL: [...gasUrl, value]});
            url = gasUrl.join('/') + '/' + value + '.json';
            break;
          default: break;
        }
        break;
      case 'formEV':
        let evUrl = this.state.evURL;
        switch(inputId) {
          case 'year':
            evUrl = evUrl.slice(0,1);
            this.setState({evURL: [...evUrl, value]});
            url = evUrl.join('/') + '/' + value + suffix;
            break;
          case 'make':
            evUrl = evUrl.slice(0,2)
            this.setState({evURL: [...evUrl, value]});
            url = evUrl.join('/') + '/' + value + suffix;
            break;
          case 'model':
            evUrl = evUrl.slice(0,3);
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
            case ('formEV'): this.setState({evkWh: res.data}); break;
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
    let nextInputIds;
    switch(inputId) {
      case 'year': nextInputIds = ['make','model']; break;
      case 'make': nextInputIds = ['model']; break;
      default: break;
    }

    let fetchedOptions = Object.keys(data).map(key => {
      return {value: key, displayValue: key}
    })

    nextInputIds.forEach(nextInputId => {
      let updatedOptions = [
        ...this.state[formId][nextInputId]['elementConfig']['options'].slice(0,1),
        ...fetchedOptions,
      ];

      fetchedOptions = null;

      const updatedFormElementConfig = updateObject(this.state[formId][nextInputId]['elementConfig'], {
        options: updatedOptions
      })
      const updatedFormElement = updateObject(this.state[formId][nextInputId], {
        elementConfig: updatedFormElementConfig,
        value: 'select',
      })
      const updatedForm = updateObject(this.state[formId], {
        [nextInputId]: updatedFormElement, 
      })
      if(formId === 'formGas') {
        this.setState({
          [formId]: updatedForm,
          gasMPG: null,
        })
      } else if(formId === 'formEV') {
        this.setState({
          [formId]: updatedForm,
          evkWh: null,
        })
      }
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
    let gasData = null;
    let evData = null;

    // Dummy data for now //
    const gasEC = 3.5;
    const gasMSRP = 30000;
    const gasM = 1000;

    
    const evEC = .15
    const evMSRP = 40000;
    const evM = 200;
    ////////////////////////

    let gasName = '';
    let evName = '';

    if(this.state.gasMPG) {
      let names = [this.state.formGas.year.value, this.state.formGas.make.value, this.state.formGas.model.value];
      gasName = names.join(' ');
      gasData = <Data
        dataLabel={gasName} 
        efficiency={this.state.gasMPG}
        energryCost={gasEC}
        msrp={gasMSRP}
        maintenance={gasM}
        fuelUnit='gal'
        ratingUnit='MPG'/>;
    }
    if (this.state.evkWh) {
      let names = [this.state.formEV.year.value, this.state.formEV.make.value, this.state.formEV.model.value];
      evName = names.join(' ');
      evData = <Data
        dataLabel={evName}
        efficiency={this.state.evkWh}
        energryCost={evEC}
        msrp={evMSRP}
        maintenance={evM}
        fuelUnit='kWh'
        ratingUnit='MPKWH'/>;
    }

    let chart = null;
    if (this.state.gasMPG && this.state.evkWh) {
      let gasChartData = { efficiency: this.state.gasMPG, energyCost: gasEC, msrp: gasMSRP, maintenance: gasM, name: gasName };
      let evChartData = { efficiency: this.state.evkWh, energyCost: evEC, msrp: evMSRP, maintenance: evM, name: evName };
      chart = (
        <div className={classes.ChartDiv}>
          <Chart gasChartData={gasChartData} evChartData={evChartData}/>
        </div>
      );
    }

    return (
      <Aux>
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
        <div className={classes.DataDiv}>
          {gasData}
          {evData}
        </div>
          {chart}
      </Aux>
    )
  }
}

export default CompareTool;