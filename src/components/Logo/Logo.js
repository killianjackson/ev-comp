import React from 'react';

import boltLogo from '../../assets/images/bolt.png';
import classes from './Logo.css';

const logo = (props) => (
  <div className={classes.Logo}>
    <img src={boltLogo} alt='Bolt'/>
  </div>
);

export default logo;