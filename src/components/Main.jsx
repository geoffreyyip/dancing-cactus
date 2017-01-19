import React from 'react';

import Header from './Header';
import Graph from './graph/Graph';
import DebtTable from './table/DebtTable';

// for icons
import '../styles/font-awesome-4.7.0/css/font-awesome.css';
// for everything else
// TODO: split this file up into smaller pieces
import '../styles/Main.css';
import '../styles/Graph.css';

const mockData = {
  debts: [
    { name: 'Car Loan', amount: 9000, interestRate: 0.05, minPayment: 620.23 },
    { name: 'College Loan',
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
    { name: 'Mortgage', amount: 43000, interestRate: 0.035, minPayment: 2100.00 },
  ],
  headerInfo: [
    { name: 'name', type: String, displayString: 'Name' },
    { name: 'amount', type: Number, displayString: 'Amount' },
    { name: 'interestRate', type: Number, displayString: 'Interest Rate' },
    { name: 'minPayment', type: Number, displayString: 'Minimum Payment' },
  ],
};

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      debts: mockData.debts,
      headerInfo: mockData.headerInfo,
    };

    this.handleNewDebt = this.handleNewDebt.bind(this);
    this.changeHandlers = this.changeHandlers.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  // this method assumes a properly formatted liability object with
  // id, name, amount, interestRate, and minPayment properties
  // name must be a string, all other fields must be numbers
  // type checking is entrusted to associated methods that call handleNewDebt
  handleNewDebt(liability) {
    // shallow copy state to prevent direct manipulation of state
    const newDebts = this.state.debts.slice();

    // ensure valid input
    // TODO: shallow copy the object and type coerce stuff within it
    const newLineItem = {};
    this.state.headerInfo.forEach((category) => {
      const fieldName = category.name;
      let change = liability[fieldName];
      if (change === '') {
        throw Error(`${fieldName} is blank!`);
      }

      if (category.type === Number) {
        change = Number(change);
        if (isNaN(change)) {
          throw Error(`Numeric change required for ${fieldName}!`);
        }
      }
      newLineItem[fieldName] = change;
    });

    newDebts.push(newLineItem);

    this.setState({
      debts: newDebts,
    });
  }

  /*
  return closures that bind to a given index (and optionally field)
  within the Debts state

  closure contains four functions
  - one to delete pending changes (reverting to the original debt)
  - one to update pending changes (but not actually save them)
  - one to commit pending changes (and overwrite the previous debt)
  - one to start pending changes (invoked from a display line item)
  */
  changeHandlers(index, field) {
    return {
      handleDeleteChanges: () => {
        const newDebts = this.state.debts.slice();
        delete newDebts[index].pendingChanges;

        this.setState({ debts: newDebts });
      },

      handleEditChanges: (event) => {
        console.log('handleEditChanges triggered');
        const newDebts = this.state.debts.slice();
        newDebts[index].pendingChanges[field] = event.target.value;

        this.setState({ debts: newDebts });
      },

      handleSaveChanges: () => {
        console.log('handleSaveChanges triggered');
        const newDebts = this.state.debts.slice();
        const lineItem = newDebts[index];

        this.state.headerInfo.forEach((category) => {
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

        this.setState({ debts: newDebts });
      },

      handleChangeItem: () => {
        console.log('handleStartChanges triggered');
        const newDebts = this.state.debts.slice();
        const lineItem = newDebts[index];
        lineItem.pendingChanges = {};

        this.state.headerInfo.forEach((category) => {
          const currData = lineItem[category.name];
          lineItem.pendingChanges[category.name] = String(currData);
        });

        this.setState({ debts: newDebts });
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
      <div className="Main">
        <Header />
        <Graph
          debts={this.state.debts}
        />
        <DebtTable
          debts={this.state.debts}
          headerInfo={this.state.headerInfo}
          handleNewDebt={this.handleNewDebt}
          changeHandlers={this.changeHandlers}
          deleteHandler={this.deleteHandler}
        />
      </div>
    );
  }
}

export default Main;
