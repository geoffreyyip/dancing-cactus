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

    this.handleNewDebt = this.handleNewDebt.bind(this);
  }

  // FIXIT: Array.prototype.concatenate is used to satisfy React's immutability
  // requirement, as the concatenate method returns a new array. However, this
  // method is prone to bugs for our use case. handleNewDebt() is meant to add one
  // new item in Object form, but concatenate requires an object in Array form
  // and typically appends a list of items.

  // The 'right' solution is learning Immutable.js. The 'right now' solution is
  // making a shallow copy.
  handleNewDebt(liability) {
    const blankChange = [{ id: liability.id, morphing: false }];
    this.setState({
      debts: this.state.debts.concat(liability),
      pendingChanges: this.state.pendingChanges.concat(blankChange),
    });
  }

  render() {
    return (
      <div>
        <Graph />
        <DebtTable
          debts={this.state.debts}
          pendingChanges={this.state.pendingChanges}
          handleNewDebt={this.handleNewDebt}
        />
      </div>
    );
  }
}

export default Main;
