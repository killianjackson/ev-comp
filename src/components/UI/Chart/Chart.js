import React from 'react';
import {VictoryChart, VictoryLine} from 'victory';
import materialTheme from './material';

import classes from './Chart.css';

const chart = (props) => {
  return (
    <div className={classes.Chart}>
      <VictoryChart
        theme={materialTheme}
        animate={{duration: 1000}}
        height={200}
        width={400}
      >
        <VictoryLine
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc"}
          }}
          data={props.lineGasData}
        />
        <VictoryLine
          style={{
            data: { stroke: "#4285F4" },
            parent: { border: "1px solid #ccc"}
          }}
          data={props.lineEVData}
        />
      </VictoryChart>
    </div>
  );
}

export default chart;