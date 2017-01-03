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
        amount: '17000',
        interestRate: '0.032',
        minPayment: '2200.00',
      },
    },
    { id: 23, name: 'Mortgage', amount: 43000, interestRate: 0.035, minPayment: 2100.00 },
  ],
  debtsMetadata: [
    { name: 'name', type: String },
    { name: 'amount', type: Number },
    { name: 'interestRate', type: Number },
    { name: 'minPayment', type: Number },
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
      debtsMetadata: mockData.debtsMetadata,
    };

    this.handleNewDebt = this.handleNewDebt.bind(this);
    this.morphingHandler = this.morphingHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
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

  // return closures that bind to a given index within the Debts state array
  // closure contains three functions
  // - one to delete pending changes (reverting to the original debt)
  // - one to update pending changes (but not actually save them)
  // - one to commit pending changes (and overwrite the previous debt)
  morphingHandler(index) {
    return {
      handleDeleteChanges: () => {
        const newDebts = shallowCopyArray(this.state.debts);
        delete newDebts[index].pendingChanges;

        this.setState({
          debts: newDebts,
        });
      },

      // FIXIT: this depends on the existence DOM attributes
      // possible solution, have morphingHandler take an
      // optional {field} argument
      handleEditChanges: (event) => {
        console.log('handleEditChanges triggered');
        const newDebts = shallowCopyArray(this.state.debts);
        const field = event.target.dataset.field;
        newDebts[index].pendingChanges[field] = event.target.value;

        this.setState({
          debts: newDebts,
        });
      },
      // FIXIT: where do I handle errors? Is it okay to handle errors
      // in child components?
      handleSaveChanges: () => {
        console.log('handleSaveChanges triggered');
        const newDebts = shallowCopyArray(this.state.debts);
        const lineItem = newDebts[index];

        this.state.debtsMetadata.forEach((category) => {
          let change = lineItem.pendingChanges[category.name];
          if (change === '') {
            throw Error(`${category.name} is blank!`);
          }

          if (category.type === Number) {
            change = Number(change);
            if (isNaN(change)) {
              throw Error(`Numeric change required for ${category.name}!`);
            }
          }

          lineItem[category.name] = change;
        });
        delete lineItem.pendingChanges;

        this.setState({
          debts: newDebts,
        });
      },
    };
  }

  deleteHandler(index) {
    return {
      handleDeleteItem: () => {
        // removes item by combining the array before
        // and the array after together
        const beforeDeletion = this.state.debts.slice(0, index);
        const afterDeletion = this.state.debts.slice(index + 1);
        const newDebts = beforeDeletion.concat(afterDeletion);

        this.setState({
          debts: newDebts,
        });
      },
    };
  }

  render() {
    return (
      <div>
        <Graph />
        <DebtTable
          debts={this.state.debts}
          handleNewDebt={this.handleNewDebt}
          morphingHandler={this.morphingHandler}
          deleteHandler={this.deleteHandler}
        />
      </div>
    );
  }
}

export default Main;
