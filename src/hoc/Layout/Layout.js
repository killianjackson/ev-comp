import React from 'react';

import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Footer from '../../components/UI/Footer/Footer';

const layout = (props) => {
    return (
      <Aux>
        <div className={classes.Wrapper}>
          <Toolbar />
          <main className={classes.Content}>
            {props.children}
          </main>
        </div>
        <Footer />
      </Aux>
    );
};

export default layout;