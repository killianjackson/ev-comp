import React from 'react';
import {VictoryChart, VictoryLine} from 'victory';
import materialTheme from './material';

const chart = (props) => {
  return (
    <VictoryChart
      theme={materialTheme}
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
  );
}

export default chart;