import React from 'react';

import EntryCell from './EntryCell';
import styles from '../../styles/tableStyles';

class AdditionLineItem extends React.Component {
  constructor(props) {
    super(props);

    // good refactoring opportunity here
    // todo: factor out input fields into their own components
    this.state = {
      name: 'college',
      amount: '2200',
      interestRate: '0.05',
      minPayment: '85',
    };
    this.addNewDebt = this.addNewDebt.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // the difficulty stems from onNewDebt's lack of type coercion and checking
  // onNewDebt requires an object with specific properties, name, amount, etc.
  // this method will need to ensure a proper input and notify user of errors
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

  render() {
    return (
      <div style={styles.lineWrapper}>
        <EntryCell onChange={this.handleChange} field="name" display={this.state.name} />
        <EntryCell onChange={this.handleChange} field="amount" display={this.state.amount} />
        <EntryCell
          onChange={this.handleChange}
          field="interestRate"
          display={this.state.interestRate}
        />
        <EntryCell
          onChange={this.handleChange}
          field="minPayment"
          display={this.state.minPayment}
        />
        <div className="addition-bar" style={styles.lineItem}>
          <i className="fa fa-plus" aria-hidden="true" onClick={this.addNewDebt}> Add </i>
          <i className="fa fa-ban" aria-hidden="true"> Reset </i>
        </div>
      </div>
    );
  }
}

AdditionLineItem.propTypes = {
  onNewDebt: React.PropTypes.func.isRequired,
};

export default AdditionLineItem;
