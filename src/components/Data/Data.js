import React from 'react';

import classes from './Data.css';

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
        <span className={classes.Efficiency}><strong>${props.msrp}</strong></span> MSRP
      </p>
      <p className={pClass}>
        <span className={classes.Efficiency}><strong>{props.efficiency}</strong></span> {props.ratingUnit}
      </p>
      <p className={pClass}>
        <span className={classes.Efficiency}><strong>${props.energryCost}</strong></span> /{props.fuelUnit}
      </p>
      <p className={pClass}>
        <span className={classes.Efficiency}><strong>${props.maintenance}</strong></span> approx. maintenance cost per year
      </p>
    </div>
  );
}

export default data

//<h2 className={classes.M}>${props.maintenance} maintenance cost per year</h2>