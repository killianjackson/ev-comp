import React from 'react';
import {VictoryChart, VictoryGroup, VictoryStack, VictoryBar, VictoryLabel, VictoryTooltip} from 'victory';
import materialTheme from './material';

import classes from './Chart.css';

const chart = (props) => {
  let gasData = [
    [{x: 'Audi', y: 1}],
    [{x: 'Audi', y: 2}],
    [{x: 'Audi', y: 3}] 
  ];

  let evData = [
    [{x: 'Tesla', y: 6}],
    [{x: 'Tesla', y: 3}],
    [{x: 'Tesla', y: 2}]
  ];

  return (
    <div className={classes.Chart}>
      <VictoryGroup
        horizontal
        animate={{duration: 1000}}
        height={170}
        width={450}
        offset={5} style={{ data: { width: 50 } }}
      >
        <VictoryStack colorScale={"blue"} labels={['$50,000']}>
          {evData.map((data, index) => {
            return <VictoryBar
              key={index}
              data={data}/>;
          })}
        </VictoryStack>
        <VictoryStack colorScale={"red"}labels={['$50,000']}>
          {gasData.map((data, index) => {
            return <VictoryBar
              key={index}
              data={data}/>;
          })}
        </VictoryStack>
      </VictoryGroup>
    </div>
  );
}

export default chart;