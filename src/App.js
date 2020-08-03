import React, {Component} from 'react';

import Layout from './hoc/Layout/Layout';
import CompareTool from './containers/CompareTool/CompareTool';
import classes from './App.css';

class App extends Component {
  render() {
    return (
      <div className={classes.PageContainer}>
        <Layout>
          <CompareTool />
        </Layout>
      </div>
    )
  }
}

export default App;
