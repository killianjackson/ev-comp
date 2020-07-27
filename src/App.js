import React, {Component} from 'react';

import Layout from './hoc/Layout/Layout';
import CompareTool from './containers/CompareTool/CompareTool';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <CompareTool />
        </Layout>
      </div>
    )
  }
}

export default App;
