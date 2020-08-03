import React from 'react';

import githubLogo from '../../assets/images/github.png';
import classes from './Logo.css';

const logo = () => (
  <div className={classes.Logo}>
    <img src={githubLogo} alt='github'/>
  </div>
);

export default logo;