import React from 'react';

import classes from './App.css';
import Button from './components/UI/Button/Button';

const App = () => {
  return (
    <div className={classes.App}>
      <h1>EV Compare</h1>
      <p>This is an app where you can compare the lifetime costs of gas cars to electric ones</p>
      <Button />
    </div>
  )
}

export default App;
