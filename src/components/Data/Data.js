import React from 'react';

import classes from './Data.css';

const data = (props) => {
  return (
    <div className={props.fuelUnit === 'gallon' ? classes.DataLeft : classes.DataRight}>
      <p className={classes.Eff}>{props.efficiency} mi/{props.fuelUnit}</p>
      <p className={classes.EC}>${props.energry_cost}/{props.fuelUnit}</p>
      <p className={classes.MSRP}>MSRP ${props.msrp}</p>
    </div>
  );
}

export default data

//<h2 className={classes.M}>${props.maintenance} maintenance cost per year</h2>