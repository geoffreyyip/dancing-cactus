import React from 'react';

import Graph from './graph/Graph';
import DebtTable from './table/DebtTable';
import '../styles/Main.css';

const mockData = {
  debts: [
    { id: 21, name: 'Car Loan', amount: 9000, interestRate: 0.05, minPayment: 620.23 },
    { id: 22, name: 'College Loan', amount: 20000, interestRate: 0.07, minPayment: 1685.47 },
    { id: 23, name: 'Mortgage', amount: 43000, interestRate: 0.035, minPayment: 2100.00 },
  ],
  pendingChanges: [
    { id: 21, morphing: false },
    { id: 22, morphing: true, name: 'Success if second in list!', amount: 17000, interestRate: 0.032, minPayment: 2200.00 },
    { id: 23, morphing: false },
  ],
};

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      debts: mockData.debts,
      pendingChanges: mockData.pendingChanges,
    };
  }

  render() {
    return (
      <div>
        <Graph />
        <DebtTable
          debts={this.state.debts}
          pendingChanges={this.state.pendingChanges}
        />
      </div>
    );
  }
}

export default Main;
