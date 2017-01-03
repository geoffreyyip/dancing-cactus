import React from 'react';

import styles from '../../styles/tableStyles';

class AdditionLineItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'college',
      amount: '2200',
      interestRate: '0.05',
      minPayment: '85',
    };
    this.addNewDebt = this.addNewDebt.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  // TODO: add type checking to ensure valid input to Main.jsx's callback
  addNewDebt() {
    const newDebt = {
      name: this.state.name,
      amount: Number(this.state.amount),
      interestRate: Number(this.state.interestRate),
      minPayment: Number(this.state.minPayment),
    };
    this.props.onNewDebt(newDebt);
  }

  // coupled to EntryCell
  // assumes component has properties corresponding to this component's state
  // read the data-field property bound to the EntryCell's object, that's the key
  // read the value property, that's the new value
  // modify state
  handleChange(event) {
    const stateChange = {};
    const field = event.target.dataset.field;
    stateChange[field] = event.target.value;

    this.setState(stateChange);
  }

  // sets all state properties to empty strings
  clearState() {
    const emptyState = {};
    Object.keys(this.state).forEach((key) => {
      emptyState[key] = '';
    });

    this.setState(emptyState);
  }

  render() {
    return (
      <div style={styles.lineWrapper}>
        <input
          onChange={this.handleChange}
          data-field="name"
          value={this.state.name}
        />
        <input
          onChange={this.handleChange}
          data-field="amount"
          value={this.state.amount}
        />
        <input
          onChange={this.handleChange}
          data-field="interestRate"
          value={this.state.interestRate}
        />
        <input
          onChange={this.handleChange}
          data-field="minPayment"
          value={this.state.minPayment}
        />
        <div className="addition-bar" style={styles.lineItem}>
          <i className="fa fa-plus" aria-hidden="true" onClick={this.addNewDebt}> Add </i>
          <i className="fa fa-ban" aria-hidden="true" onClick={this.clearState}> Reset </i>
        </div>
      </div>
    );
  }
}

AdditionLineItem.propTypes = {
  onNewDebt: React.PropTypes.func.isRequired,
};

export default AdditionLineItem;
