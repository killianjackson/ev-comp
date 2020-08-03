import React from 'react';

import classes from './Footer.css';
import Logo from '../../Logo/GithubLogo';

const footer = () => (
  <div className={classes.Footer}>
      <Logo />
      <a href='https://github.com/killianjackson' className={classes.Link}>@killianjackson</a>
  </div>
);

export default footer;