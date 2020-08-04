import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer
} from 'recharts';
import Aux from '../../../hoc/Aux/Aux';
import {dollarFormatter} from '../../../shared/utility';

const calculateChartData = (data) => {
  const name = data.name;
  const msrp = data.msrp;
  const main = (data.maintenance * 5);
  const fuelC = parseFloat(((1/data.efficiency) * data.energyCost * 15000).toFixed(2));
  const total = msrp + main + fuelC;

  return {
    data: [
      {
        name: name,
        MSRP: msrp,
        Maintenance: main,
        "Fuel Cost": fuelC,
      }
    ],
    total: total
  };
}

const totalFormatter = (value) => {
  return dollarFormatter(value) + "\nTotal";
}

const chart = (props) => {
  const gasChartData = calculateChartData(props.gasChartData);
  const evChartData = calculateChartData(props.evChartData);
  const xAxisDomain = Math.max((gasChartData.total),(evChartData.total));
  return (
    <Aux>
      <h1>5 Year Cost Comparison</h1>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart
            layout="vertical"
            data={gasChartData.data}
            margin={{
              top: 20, right: 30, left: 20, bottom: 5,
            }}
          >
            <YAxis type="category" dataKey="name" />
            <XAxis type="number" domain={[0, xAxisDomain]} hide/>
            <Tooltip formatter={dollarFormatter}/>
            <Legend />
            <Bar dataKey="MSRP" stackId="a"  fill="#DB4437" />
            <Bar dataKey="Maintenance" stackId="a" fill="#E57C73" />
            <Bar dataKey="Fuel Cost" stackId="a"  fill="#F0B4AF"><LabelList position="insideRight" formatter={totalFormatter}/></Bar>
          </BarChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart
            layout="vertical"
            data={evChartData.data}
            margin={{
              top: 20, right: 30, left: 20, bottom: 5,
            }}
          >
            <YAxis type="category" dataKey="name" />
            <XAxis type="number" domain={[0, xAxisDomain]} hide/>
            <Tooltip formatter={dollarFormatter}/>
            <Legend />
            <Bar dataKey="MSRP" stackId="a" fill="#4285F4"/>
            <Bar dataKey="Maintenance" stackId="a" fill="#7AA9F7" />
            <Bar dataKey="Fuel Cost" stackId="a" fill="#B3CEFA" ><LabelList position="insideRight"  formatter={totalFormatter}/></Bar>
          </BarChart>
        </ResponsiveContainer>
    </Aux>
  );
}

export default chart;