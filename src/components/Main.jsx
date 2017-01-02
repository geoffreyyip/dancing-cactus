import React from 'react';

import Graph from './graph/Graph';
import DebtTable from './table/DebtTable';
import '../styles/Main.css';

const mockData = {
  debts: [
    { id: 21, name: 'Car Loan', amount: 9000, interestRate: 0.05, minPayment: 620.23 },
    { id: 22,
      name: 'College Loan',
      amount: 20000,
      interestRate: 0.07,
      minPayment: 1685.47,
      pendingChanges: {
        name: 'Success!',
        amount: 17000,
        interestRate: 0.032,
        minPayment: 2200.00,
      },
    },
    { id: 23, name: 'Mortgage', amount: 43000, interestRate: 0.035, minPayment: 2100.00 },
  ],
};

function shallowCopyArray(arr) {
  const result = [];
  arr.forEach((item) => {
    result.push(item);
  });
  return result;
}

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      debts: mockData.debts,
    };

    this.handleNewDebt = this.handleNewDebt.bind(this);
  }

  // this method assumes a properly formatted liability object with
  // id, name, amount, interestRate, and minPayment properties
  // name must be a string, all other fields must be numbers
  // type checking is entrusted to associated methods that call handleNewDebt
  handleNewDebt(liability) {
    // shallow copy state to prevent direct manipulation of state
    const newDebts = shallowCopyArray(this.state.debts);
    newDebts.push(liability);

    // assign unique id to new liability
    const last = newDebts.length - 1;
    const currentMaxId = newDebts[last - 1].id;
    newDebts[last].id = currentMaxId + 1;

    this.setState({
      debts: newDebts,
    });
  }

  render() {
    return (
      <div>
        <Graph />
        <DebtTable
          debts={this.state.debts}
          handleNewDebt={this.handleNewDebt}
        />
      </div>
    );
  }
}

export default Main;
