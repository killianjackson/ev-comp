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

  calculateChartData = (efficiency, energry_cost, msrp, maintenance) => {
    let i;
    let chartData = [];
    let y = msrp;
    for(i = 0; i < 10; i++) {
      if (i > 0) {
        y += (((1/efficiency) * energry_cost * 10000) + maintenance);
      }
      chartData.push({
        x: i,
        y: parseFloat(y.toFixed(2)),
      });
    }
    return chartData;
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

    let lineGasData = null;
    let lineEVData = null;

    if(this.state.gasMPG) {
      let names = [this.state.formGas.year.value, this.state.formGas.make.value, this.state.formGas.model.value];
      let dataLabel = names.join(' ');
      gasData = <Data
        dataLabel={dataLabel} 
        efficiency={this.state.gasMPG}
        energry_cost={gasEC}
        msrp={gasMSRP}
        maintenance={gasM}
        fuelUnit='gal'
        ratingUnit='MPG'/>;
    }
    if (this.state.evkWh) {
      let names = [this.state.formEV.year.value, this.state.formEV.make.value, this.state.formEV.model.value];
      let dataLabel = names.join(' ');
      evData = <Data
        dataLabel={dataLabel}
        efficiency={this.state.evkWh}
        energry_cost={evEC}
        msrp={evMSRP}
        maintenance={evM}
        fuelUnit='kWh'
        ratingUnit='MPKWH'/>;
    }

    let chart = <Chart />;
    if (this.state.gasMPG && this.state.evkWh) {
      lineGasData = this.calculateChartData(this.state.gasMPG, gasEC, gasMSRP, gasM);
      lineEVData = this.calculateChartData(this.state.evkWh, evEC, evMSRP, evM);
      chart = <Chart lineGasData={lineGasData} lineEVData={lineEVData}/>
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
        <div className={classes.ChartDiv}>
          {chart}
        </div>
      </Aux>
    )
  }
}

export default CompareTool;