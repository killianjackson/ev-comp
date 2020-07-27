import React from 'react';

import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

const layout = (props) => {
    return (
      <Aux>
        <Toolbar />
        <main className={classes.Content}>
          {props.children}
        </main>
      </Aux>
    );
};

export default layout;