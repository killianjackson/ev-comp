import React from 'react';

import classes from './Data.css';
import Aux from '../../hoc/Aux/Aux';

const data = (props) => {
  return (
    <Aux>
      <h1 className={classes.Eff}>{props.efficiency} mi/{props.fuelUnit}</h1>
      <h2 className={classes.EC}>${props.energry_cost}/{props.fuelUnit}</h2>
      <h1 className={classes.MSRP}>MSRP ${props.msrp}</h1>
      <h2 className={classes.M}>${props.maintenance} maintenance cost per year</h2>
      <h3 className={classes.MPY}>Based on 10,000 miles driven per year</h3>
    </Aux>
  );
}

export default data

