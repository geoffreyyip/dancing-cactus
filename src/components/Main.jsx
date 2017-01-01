import React from 'react';

import Graph from './graph/Graph';
import DebtTable from './table/DebtTable';
import '../styles/Main.css';

// foo="bar" is a debugging thing
const Main = () => (
  <div>
    <Graph />
    <DebtTable />
  </div>
);

export default Main;
