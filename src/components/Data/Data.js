import React from 'react';

import classes from './Data.css';
import {dollarFormatter} from '../../shared/utility';

const data = (props) => {
  let pClass;
  let divClass;
  if(props.ratingUnit === 'MPG') {
    pClass = classes.Gas;
    divClass = classes.DataLeft;
  } else {
    pClass = classes.EV;
    divClass = classes.DataRight;
  }

  return (
    <div className={divClass}>
      <h1 className={classes.h1}>{props.dataLabel}</h1>
      <p className={pClass}>
        <span className={classes.Value}><strong>{dollarFormatter(props.msrp)}</strong></span> MSRP
      </p>
      <p className={pClass}>
        <span className={classes.Value}><strong>{props.efficiency}</strong></span> {props.ratingUnit}
      </p>
      <p className={pClass}>
        <span className={classes.Value}><strong>{dollarFormatter(props.energryCost)}</strong></span> /{props.fuelUnit}
      </p>
      <p className={pClass}>
        <span className={classes.Value}><strong>{dollarFormatter(props.maintenance)}</strong></span> approx. maintenance cost per year
      </p>
    </div>
  );
}

export default data

//<h2 className={classes.M}>${props.maintenance} maintenance cost per year</h2>